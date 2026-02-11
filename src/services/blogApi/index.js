import { usarApiMock } from '../../config/apiMode'
import { httpBlogApi } from './httpBlogApi'
import { mockBlogApi } from './mockBlogApi'

export const blogApi = usarApiMock ? mockBlogApi : httpBlogApi

