import json
from openai import OpenAI

def lambda_handler(event, context):
    # return event
    if  event["requestContext"]["http"]["method"] == "OPTIONS":
        return {
          "statusCode": 200,
          "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          },
        }
    json_body = json.loads(event['body'])
    client = OpenAI(
    api_key=YOUR_API_KEY,
    )
    try:
        prompt_intro = f"Generate an introduction for {json_body['name']} based on their {json_body['education']},\
        {json_body['skills']} and{json_body['experience']},\
    the length of the intro will be {len(json_body['experience'])} paragraphs:"
        prompt_headline = f"Generate a headline for {json_body['name']}  based on {json_body['experience']} \
        and {json_body['skills']}, \
        but do not include the companies and make the headline sounds brilliant:"
    except KeyError:
        return f"KeyError occurred: {e}"
    response_intro = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt_intro,
        max_tokens=500
    )
    response_headline = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt_headline,
        max_tokens=100
    )
    response = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        },
        "body": json.dumps({
            "Introduction": response_intro.choices[0].text.strip(),
            "Headline": response_headline.choices[0].text.strip()
        })
    }
    return response
