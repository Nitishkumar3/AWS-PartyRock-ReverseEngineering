import json

def ExtractCookies(file_path):
    with open(file_path, 'r') as file:
        cookies_data = json.load(file)
    
    cookies = {
        "aws-waf-token": None,
        "s_sq": None,
        "pr_refresh_token": None,
        "idToken": None,
        "s_fid": None
    }
    
    for cookie in cookies_data:
        if cookie['name'] == 'aws-waf-token':
            cookies['aws-waf-token'] = cookie['value']
        elif cookie['name'] == 's_sq':
            cookies['s_sq'] = cookie['value']
        elif cookie['name'] == 'pr_refresh_token':
            cookies['pr_refresh_token'] = cookie['value']
        elif cookie['name'] == 'idToken':
            cookies['idToken'] = cookie['value']
        elif cookie['name'] == 's_fid':
            cookies['s_fid'] = cookie['value']
    
    return cookies