# import hashlib
# import random
# import time
# import requests
# from slugify import slugify

# import requests
# import json
# import os

# API_KEY = os.getenv("BAIDU_API_KEY")
# SECRET_KEY = os.getenv("BAIDU_SECRET_KEY")
# print(API_KEY, SECRET_KEY)

# def trans(q):
#     if not q:
#         return ''
#     url = "https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token=" + get_access_token()
    
#     payload = json.dumps({
#         "from": "auto",
#         "to": "en",
#         "q": q
#     })
#     headers = {
#         'Content-Type': 'application/json',
#         'Accept': 'application/json'
#     }
    
#     response = requests.request("POST", url, headers=headers, data=payload)
#     # print(response.json())
#     if 'result' not in response.json():
#         return 'failed'
#     return response.json()['result']['trans_result'][0]['dst']
    

# def get_access_token():
#     """
#     使用 AK，SK 生成鉴权签名（Access Token）
#     :return: access_token，或是None(如果错误)
#     """
#     url = "https://aip.baidubce.com/oauth/2.0/token"
#     params = {"grant_type": "client_credentials", "client_id": API_KEY, "client_secret": SECRET_KEY}
#     return str(requests.post(url, params=params).json().get("access_token"))


# def translate(content):
#     res = trans(content)
#     return slugify(res)


import hashlib
import random
import time
import requests
from slugify import slugify



def translate(content):
    if not content:
        return ''
    salt = str(round(time.time() * 1000)) + str(random.randint(0, 9))
    data = "fanyideskweb" + content + salt + "Tbh5E8=q6U3EXe+&L[4c@"
    sign = hashlib.md5()
    sign.update(data.encode("utf-8"))
    sign = sign.hexdigest()

    url = 'http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'
    headers = {
        'Cookie': 'OUTFOX_SEARCH_USER_ID=-1927650476@223.97.13.65;',
        'Host': 'fanyi.youdao.com',
        'Origin': 'http://fanyi.youdao.com',
        'Referer': 'http://fanyi.youdao.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36',
    }
    data = {
        'i': str(content),
        'from': 'auto',
        'to': 'en',
        'smartresult': 'dict',
        'client': 'fanyideskweb',
        'salt': str(salt),
        'sign': str(sign),
        'version': '2.1',
        'keyfrom': 'fanyi.web',
        'action': 'FY_BY_REALTlME',
    }

    res = requests.post(url=url, headers=headers, data=data).json()
    if (translate_result := res.get('translateResult')) is None:
        return slugify(content)
    res = translate_result[0][0]['tgt']
    return slugify(res)
