import { Plus } from 'lucide-react'
import Button from './components/Button'

function App() {
  return (
    <div className='flex-col gap-4  p-5' >
      
      <Button variant='ghost' startIcon={<Plus size={12}/>} text='Hello World' size='sm'/>
      <Button variant='ghost' startIcon={<Plus size={14}/>} text='Hello World' size='md'/>
      <Button variant='ghost' startIcon={<Plus size={16}/>} text='Hello World' size='lg'/>
    </div>
  )
}

export default App  