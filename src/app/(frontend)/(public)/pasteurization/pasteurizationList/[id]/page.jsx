
import dynamic from 'next/dynamic'

const Index = dynamic(()=> import ("src/components/bottle"),{
  ssr:false
})


export default function Bottles() {
  return (
    <div>
        <Index/>
    </div>
  )
}
