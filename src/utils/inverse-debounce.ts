import { delay } from './delay'

interface InverseDebounceProps {
  fn?: (args?: any) => Promise<void> | void
  minimumDelay?: number
}
export const InverseDebounce = (props: InverseDebounceProps) => {
  const {
    minimumDelay = 0,
    fn = async () => { console.log('default function param of InverseDebounce') }
  } = props

  let counter = 0

  return async function ExecuteFN (args: any) {
    counter += 1

    if (counter !== 1) return

    const listOfFn = [
      delay(minimumDelay),
      fn != null && fn(args)
    ]

    await Promise.all(listOfFn)
    counter = 0
  }
}
