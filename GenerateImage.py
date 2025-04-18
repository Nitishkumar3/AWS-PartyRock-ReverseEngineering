import httpx
import re
from fake_useragent import UserAgent
import json
from ExtractCookies import ExtractCookies

cookies = ExtractCookies('cookies.txt')

def get_dimensions(aspect_ratio: str):
    aspect_map = {
        "16:9": (1280, 720),
        "9:16": (720, 1280),
        "2:3": (768, 1152),
        "3:2": (1152, 768),
        "1:1": (512, 512),
        "3:4": (768, 1024),
        "4:3": (1024, 768),
        "4:5": (768, 960),
        "5:4": (960, 768),
    }
    return aspect_map.get(aspect_ratio, (None, None))

async def GenerateImage(prompt, aspect_ratio):
    base_url = "https://partyrock.aws"
    image_url = f"{base_url}/image"
    post_url = f"{base_url}/api/generateImage"

    ua = UserAgent()

    async with httpx.AsyncClient(cookies=cookies, timeout=60.0) as client:
        response = await client.get(image_url)

        match = re.search(r'<meta name="anti-csrftoken-a2z" value="([^"]+)"', response.text)
        csrf_token = match.group(1) if match else None

        if not csrf_token:
            return

        headers = {
            "Content-Type": "application/json",
            "Origin": base_url,
            "Referer": image_url,
            "User-Agent": ua.random,
            "anti-csrftoken-a2z": csrf_token,
        }

        width, height = get_dimensions(aspect_ratio)

        payload = {
            "prompt": prompt,
            "negativePrompt": "",
            "options": {
                "model": "bedrock-amazon.nova-canvas-v1-0",
                "cfgScale": 6,
                "height": height,
                "width": width
            },
            "context": {
                "type": "image-playground"
            }
        }

        response = await client.post(post_url, headers=headers, json=payload)

        response_json = json.loads(response.text)

        image_base64 = response_json["result"]["data"]["imageBase64"]

        if image_base64.startswith("data:image/jpeg;base64,"):
            image_base64 = image_base64.split(",")[1]

    return image_base64