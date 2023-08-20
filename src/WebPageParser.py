from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright


class WebPageParser:

    def get_cleaned_text(self, _URL):
        with sync_playwright() as p:
            browser = p.chromium.launch(
                executable_path="C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
            page = browser.new_page()

            try:
                page.goto(_URL, timeout=8000)
                html_content = page.content()
                soup = BeautifulSoup(html_content, 'html.parser')
                text = soup.find('body')
                if text:
                    text = text.get_text().strip()
                    text = ' '.join(text.split('\n'))
                    text = ' '.join(text.split())
                return text[:5000]
            except Exception:
                return ""