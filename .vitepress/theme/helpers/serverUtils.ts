import globby from "globby";
import matter from "gray-matter";
import fs from "fs-extra";
import axios from "axios";
import { encode } from 'gpt-3-encoder';
import { createHash } from "crypto";


const proxy_env = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || undefined;

let proxy: { host: string, port: number, protocol: string } | undefined = undefined;
if (proxy_env) {
    proxy = {
        host: proxy_env.split(':')[1].replace('//', ''),
        port: parseInt(proxy_env.split(':')[2]),
        protocol: proxy_env.split(':')[0]
    }
}


function tiktoken(content: string) {
    const len = x => encode(x).length
    let l = 0, r = 3500, mid = (l + r) / 2;
    while (l < r) {
        mid = (l + r) / 2;
        if (len(content.slice(0, mid)) > 3500) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return content.slice(0, mid);
}


function getSummary(content: string, token: string): Promise<string> {
    const ai_promt = "You are an assistant to write a summary for the article below. " + 
        "Please write a summary of the article below in no more than 100 words or 100 characters (if the article is written in Chinese). " + 
        "Note: you should use chinese."
    return new Promise((res, rej) => {
        axios({
            method: 'post',
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                'model': 'gpt-4',
                'messages': [
                    { 'role': 'system', 'content': ai_promt },
                    { 'role': 'user', 'content': content }
                ]
            },
            proxy
        }).then(response => {
            res(response.data.choices[0].message.content)
        }).catch(error => {
            rej(error);
        });
    })
}

export async function getPosts(config: { aiSummary?: { openai_api_token: string }}) {
    let summary_cache = {}, new_cache = {}
    try {
        summary_cache = await fs.readJSON('./summary.json', { throws: false })
    } catch {}

    let paths = await getPostMDFilePaths();
    let postsAll = await Promise.all(
        paths.map(async (item) => {
            const text = await fs.readFile(item, "utf-8");
            const { data, content } = matter(text);
            if (data.draft) {
                return null;
            }
            data.date = _convertDate(data.date);
            return {
                frontMatter: data,
                regularPath: `/${item.replace(".md", ".html")}`,
                content,
                filePath: item,
                md5: createHash('md5').update(text).digest('hex'),
            };
        })
    );
    
    let posts = await Promise.all(
        postsAll.filter(item => item != null)
    );
    
    if (postsAll) {
        for (let post of postsAll) {
            if (!post || post?.frontMatter?.description) continue
            // let summary = ''
            // if (post.md5 in summary_cache) {
            //     summary = summary_cache[post.md5].summary
            // } else {
            //     // const token = config.aiSummary.openai_api_token
            //     // const content = tiktoken(post.content)
            //     // console.log(`[AI Summary] ${post.frontMatter.title} (${post.filePath})`)
            //     // summary = await getSummary(content, token)
            // }
            // post.frontMatter.description = summary
            // new_cache[post.md5] = {
            //     title: post.frontMatter.title,
            //     path: post.filePath,
            //     summary: summary
            // }
            // await fs.writeJSON('./summary.json', new_cache, { spaces: 4 })
        }
    }
    posts.sort(_compareDate);
    return posts;
}

function _convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON();
    return json_date.split("T")[0];
}

function _compareDate(obj1, obj2) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

async function getPostMDFilePaths() {
    let paths = await globby(["**.md"], {
        ignore: ["node_modules", "README.md"],
    });
    return paths.filter((item) => item.includes("posts/"));
}

export async function getPostLength() {
    // getPostMDFilePath return type is object not array
    return [...(await getPostMDFilePaths())].length;
}


// export async function getTags(): Promise<Array<Tag>> {

//     let posts = await getPosts({})
//     let tags: Array<Tag> = []
//     posts.map((p) => {
//         if (!p) return null
//         if (p.frontMatter.tags != null) {
//             let tnames = tags.map(item => item.name)
//             let ptags = p.frontMatter.tags
//             ptags.map((pt) => {
//                 let index = tnames.indexOf(pt)
//                 if (index > -1) {
//                     tags.at(index) != undefined ?
//                         tags[index].count += 1 : null
//                 } else {
//                     let t: Tag = {
//                         name: pt,
//                         count: 1
//                     }
//                     tags.push(t)
//                 }
//             })
//         }
//     })

//     tags.sort(_comparePostCount)

//     return tags
// }
export async function getTags(): Promise<Array<Tag>> {

    let posts = await getPosts({})
    let tags: Array<Tag> = []
    posts.map((p) => {
        if (!p) return null
        if (p.frontMatter.tags != null) {
            let tnames = tags.map(item => item.name)
            let ptags = p.frontMatter.tags
            ptags.map((pt) => {
                let index = tnames.indexOf(pt)
                if (index > -1) {
                    if (tags[index] != undefined) {
                        tags[index].count += 1
                    }
                } else {
                    let t: Tag = {
                        name: pt,
                        count: 1
                    }
                    tags.push(t)
                }
            })
        }
    })

    tags.sort(_comparePostCount)

    return tags
}


function _comparePostCount(obj1, obj2) {
    return obj1.count < obj2.count ? 1 : -1;
}

interface Collection {
    name: string,
    count: number,
}

interface Tag {
    name: string,
    count: number
}