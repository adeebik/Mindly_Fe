interface TagProps {
    title: string
}

export default function Tags(tags : TagProps) {
  return (
    <>
        <button className="p-1 border border-blue-300 text-xs font-normal text-blue-600 rounded-md bg-blue-50"> {tags.title}</button>
    </>
  )
}
