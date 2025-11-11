import MealCalendar from '../components/MealCalendar'

const PlannerPage = () => {
  return (

    <div> 
      <h2 className='mt-10 flex justify-center text-3xl text-purple-500'> Twój plan posiłków </h2> 
      <div className='container mx-auto p-10'> 
        <MealCalendar/>
      </div>
    </div>

  )
}

export default PlannerPage
