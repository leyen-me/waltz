import type { H3Event } from "h3";

export const defineHasAuthority = (event: H3Event, auth: string) => {
    const authorityList = event.context.user.authorityList || []
    if (!authorityList.includes(auth)) {
        throw createError({ statusCode: 403, statusMessage: "权限不足" })
    }
}