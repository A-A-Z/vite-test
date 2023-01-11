import { setupWorker, rest } from 'msw'
import { InfoResponse } from '../features/divisions/divisionsSlice'

interface InfoBody {
  test: string
}

export const worker = setupWorker(
  rest.get<InfoBody, InfoResponse>('/mockapi/info/:foo', async (req, res, ctx) => {
    const { foo } = await req.params
    return res(
      ctx.delay(2000),
      ctx.json({
        foo,
        bar: 'Something'
      })
    )
  })
)
