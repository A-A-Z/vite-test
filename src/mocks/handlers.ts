import { setupWorker, rest } from 'msw'
import { InfoResponse } from '../features/divisions/divisionsSlice'
import divisionMiscData from './data/divisions1.json'
import divisionRootData from './data/divsion_root.json'
import divisionStateData from './data/division_state.json'
import divisionClientData from './data/division_client.json'
import divisionLocationData from './data/division_location.json'
import summaryClientData from './data/summary_client.json'

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
  }),

  rest.get('/mockapi/division/search', async (req, res, ctx) => {
    const level = req.url.searchParams.get('level')
    let data = {}

    switch (level) {
      case 'root':
        data = divisionRootData
        break

      case 'state':
        data = divisionStateData
        break

      case 'client':
        data = divisionClientData
        break

      case 'location':
        data = divisionLocationData
        break

      default:
        data = divisionMiscData
    }

    return res(
      ctx.delay(1500),
      ctx.json(data)
    )
  }),

  rest.get('/mockapi/division/:id/summary', async (req, res, ctx) => {
    const data = summaryClientData
    const { id } = req.params
    const fakeId = parseInt(id as string)
    data.data.id = fakeId
    return res(
      ctx.delay(1500),
      ctx.json(data)
    )
  })
)
