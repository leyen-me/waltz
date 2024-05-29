import {
  createParser,
  type ParsedEvent,
  type ReconnectInterval,
} from "eventsource-parser";

/**
 * const stream = await useFetchStream(options);
 * return new Response(stream)
 */
const useFetchStream = async ({
  url,
  authorization,
  body,
}: {
  url: string;
  authorization: string;
  body: any;
}) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify(body),
  });
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            // check if it receives chunked data from chatgpt API
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }
      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        //check if it can decode the chunk data to send as stream data
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};

export default useFetchStream;
