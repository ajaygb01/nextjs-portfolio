from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.set_viewport_size({"width": 1280, "height": 1024})
    page.goto("http://localhost:3000")
    page.wait_for_timeout(5000) # wait for 5 seconds
    page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
