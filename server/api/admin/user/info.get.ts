export default defineWrappedResponseHandler(async (event) => {
  return defineOk({ data: event.context.user })
});
