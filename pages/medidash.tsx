import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Define the full Patient interface
interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
  };
  bloodSugar: Array<{ timestamp: string; value: number }>;
  status: string; // "stable", "warning", "critical"
  appointmentHistory: Array<{ date: string; reason: string; notes: string }>;
  notes: string;
}

// Define props for the MediDashPage component
interface MediDashPageProps {
  patients: Patient[];
  error?: string;
}

// Define props for PatientCard
interface PatientCardProps {
  patient: Patient;
}

const statusColors: { [key: string]: string } = {
  stable: 'bg-green-500',
  warning: 'bg-yellow-500',
  critical: 'bg-red-500',
};

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const latestAppointment = patient.appointmentHistory.length > 0
    ? patient.appointmentHistory[patient.appointmentHistory.length - 1]
    : null;

  // Format timestamp for XAxis display (e.g., "05/01 08:00")
  const formattedBloodSugarData = patient.bloodSugar.map(bs => ({
    ...bs,
    displayTimestamp: new Date(bs.timestamp).toLocaleTimeString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  }));


  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mb-1">{patient.name}</h3>
          <div className="flex items-center">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColors[patient.status] || 'bg-gray-400'}`}></span>
            <span className="text-sm font-medium">{patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-1">Age: {patient.age}</p>
        <p className="text-sm text-gray-600 mb-2">Diagnosis: {patient.diagnosis}</p>

        <div className="mb-3">
          <h4 className="font-semibold text-sm mb-1">Vitals:</h4>
          <p className="text-xs text-gray-500">HR: {patient.vitals.heartRate} bpm | BP: {patient.vitals.bloodPressure} | Temp: {patient.vitals.temperature}°C</p>
        </div>

        {latestAppointment && (
          <div className="mb-3">
            <h4 className="font-semibold text-sm mb-1">Last Appointment:</h4>
            <p className="text-xs text-gray-500">{new Date(latestAppointment.date).toLocaleDateString()}: {latestAppointment.reason}</p>
          </div>
        )}

        {patient.notes && (
          <div className="mb-3">
            <h4 className="font-semibold text-sm mb-1">Notes:</h4>
            <p className="text-xs text-gray-500 truncate">{patient.notes}</p>
          </div>
        )}
      </div>

      {patient.bloodSugar && patient.bloodSugar.length > 0 ? (
        <div className="mt-auto"> {/* Pushes chart to the bottom */}
          <h4 className="font-semibold text-sm mb-1 mt-2">Blood Sugar (mg/dL):</h4>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={formattedBloodSugarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="displayTimestamp" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ fontSize: '12px', padding: '2px 5px' }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '2px' }}
                formatter={(value: number) => [`${value} mg/dL`, "Value"]}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} name="Blood Sugar" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-4">No blood sugar data available.</p>
      )}
    </div>
  );
};


const MediDashPage: React.FC<MediDashPageProps> = ({ patients, error }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    if (!patients) return [];
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">MediDash - Patient Dashboard</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!patients) {
     return (
      <>
        <Head>
          <title>MediDash | Patient Dashboard</title>
          <meta name="description" content="View and manage patient information, health metrics, and medical history on the MediDash dashboard." />
        </Head>
        <div className="p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4">MediDash - Patient Dashboard</h1>
          <p>Loading patient data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>MediDash | Patient Dashboard</title>
        <meta name="description" content="View and manage patient information, health metrics, and medical history on the MediDash dashboard." />
      </Head>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">MediDash - Patient Dashboard</h1>
          <input
          type="text"
          placeholder="Search patients by name, ID, or diagnosis..."
          className="p-3 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/2 lg:w-1/3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No patients found matching your search criteria.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<MediDashPageProps> = async (context) => {
  // Determine base URL dynamically
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const host = context.req.headers.host || 'localhost:3000'; // Fallback for local dev
  const baseUrl = `${protocol}://${host}`;
  const apiUrl = `${baseUrl}/api/patients`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      // Log the status and response text for more detailed error information
      const errorText = await res.text();
      console.error(`API request failed with status ${res.status}: ${errorText}`);
      let errorMessage = `Failed to load patient data. Status: ${res.status}`;
      if (res.status === 404) {
        errorMessage = 'Patient data API endpoint not found (404).';
      } else if (res.status === 500) {
        errorMessage = 'Server error when trying to load patient data (500).';
      }
      return {
        props: {
          patients: [],
          error: errorMessage,
        },
      };
    }
    const patients: Patient[] = await res.json();
    return {
      props: {
        patients,
      },
    };
  } catch (e: any) {
    console.error('Error fetching patient data in getServerSideProps:', e);
    // Handle network errors or other issues with the fetch call itself
    return {
      props: {
        patients: [],
        error: `An unexpected error occurred: ${e.message}`,
      },
    };
  }
};

export default MediDashPage;
