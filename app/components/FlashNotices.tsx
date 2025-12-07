import { type FailedToCreate } from '../api/meal-plan-generator/services';
import FlashNotice from "./FlashNotice"

export default function FlashNotices({ flashNotices }: { flashNotices: FailedToCreate[] } ) {
  return (
    <>
      {flashNotices.map((flashNotice, index) => {
        return (
          <FlashNotice key={index} flashNotice={flashNotice}/>
        )
      })}
    </>
  )
}