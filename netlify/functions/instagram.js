import fetch from "node-fetch"

const url = new URL(`https://graph.instagram.com/me/media`);
url.searchParams.append("fields", "caption,media_url,media_type,timestamp,username,thumbnail_url");
url.searchParams.append(
  "access_token",
  "IGQVJXQUxFMDRUdi11eFJWdi1aa1Njd2hzUlpKNWpYa25SRkxfX09jd1ZAtYzRaRUxyZADMxd2lWQVlMWnhPa21sM0p6TF9jbHVlMXVpOXFTRmRsby1UOFpiSDh0WUVYczFCdWxEUEN3"
);
console.log(url.href);

export const handler = async () => {
    const media = await fetch(url.href);
    console.log(media);

    
    return {
        statusCode: 200,
        body: JSON.stringify(media)
    }
}