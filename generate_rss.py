import os
import datetime
from email.utils import formatdate

BLOG_DIR = 'blog'
BASE_URL = 'https://paxamans.github.io'
RSS_FILE = 'rss.xml'

def generate_rss():
    items = []
    for root, dirs, files in os.walk(BLOG_DIR):
        for file in files:
            if file == 'index.html':
                if root == BLOG_DIR:
                    continue
                
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                title = ""
                description = ""
                date_str = ""
                
                if '<title>' in content:
                    title = content.split('<title>')[1].split('</title>')[0].replace('Iggys website | ', '')
                
                if '<meta name="description" content="' in content:
                    description = content.split('<meta name="description" content="')[1].split('"')[0]
                
                # Date (looking for the date pattern in the HTML, e.g., "02 December, 2025")
                # This is a bit fragile and depends on the specific HTML structure seen in the examples
                # Example: <p class="secondary small">\n            02 December, 2025
                try:
                    if '<p class="secondary small">' in content:
                        date_part = content.split('<p class="secondary small">')[1]
                        # Take the next non-empty line or chunk
                        lines = date_part.split('\n')
                        for line in lines:
                            if line.strip() and not line.strip().startswith('<'):
                                date_str = line.strip()
                                break
                except Exception:
                    pass

                # Link  
                rel_path = os.path.relpath(root, '.')
                link = f"{BASE_URL}/{rel_path.replace(os.sep, '/')}/"
                
                # Parse date to RFC 822
                pub_date = formatdate(usegmt=True) # Default to now if fail
                if date_str:
                    try:
                        dt = datetime.datetime.strptime(date_str, "%d %B, %Y")
                        pub_date = formatdate(dt.timestamp(), usegmt=True)
                    except ValueError:
                        pass
                
                items.append({
                    'title': title,
                    'link': link,
                    'description': description,
                    'pubDate': pub_date,
                    'guid': link
                })
    
    rss_content = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>Iggys website</title>
    <link>{BASE_URL}</link>
    <description>Sharing personal opinion online</description>
    <language>en-us</language>
    <atom:link href="{BASE_URL}/{RSS_FILE}" rel="self" type="application/rss+xml" />
"""
    
    for item in items:
        rss_content += f"""
    <item>
        <title>{item['title']}</title>
        <link>{item['link']}</link>
        <description>{item['description']}</description>
        <pubDate>{item['pubDate']}</pubDate>
        <guid>{item['guid']}</guid>
    </item>"""

    rss_content += """
</channel>
</rss>"""

    with open(RSS_FILE, 'w', encoding='utf-8') as f:
        f.write(rss_content)
    
    print(f"Generated {RSS_FILE} with {len(items)} items.")

if __name__ == "__main__":
    generate_rss()
