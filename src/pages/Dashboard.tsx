import Card from "../components/Card";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";

 const sampleContents = [
    {
      _id: "5",
      title: "System Design Fundamentals",
      link: "https://youtu.be/K9R7KcaettM",
      type: "youtube",
      description: "Complete guide to system design concepts and patterns",
      tags: [
        { _id: "9", title: "systemdesign" },
        { _id: "7", title: "tech" },
      ],
      userId: { id: "1", email: "demo@brainly.app", name: "Demo User" },
      createdAt: new Date(2024, 11, 8).toDateString(),
    },
    {
      _id: "6",
      title: "React Hooks Tutorial",
      link: "https://www.youtube.com/watch?v=PIyf0hMc498&list=RDGMEMCMFH2exzjBeE_zAHHJOdxgVMK9R7KcaettM&index=2",
      type: "youtube",
      tags: [
        { _id: "10", title: "react" },
        { _id: "11", title: "tutorial" },
      ],
      userId: { id: "1", email: "demo@brainly.app", name: "Demo User" },
      createdAt: new Date(2024, 11, 5).toDateString(),
    },{
      _id: "5",
      title: "System Design Fundamentals",
      link: "https://youtu.be/K9R7KcaettM",
      type: "twitter",
      description: "Complete guide to system design concepts and patterns",
      tags: [
        { _id: "9", title: "systemdesign" },
        { _id: "7", title: "tech" },
      ],
      userId: { id: "1", email: "demo@brainly.app", name: "Demo User" },
      createdAt: new Date(2024, 11, 8).toDateString(),
    },
    {
      _id: "6",
      title: "React Hooks Tutorial",
      link: "https://www.youtube.com/watch?v=PIyf0hMc498&list=RDGMEMCMFH2exzjBeE_zAHHJOdxgVMK9R7KcaettM&index=2",
      type: "youtube",
      tags: [
        { _id: "10", title: "react" },
        { _id: "11", title: "tutorial" },
      ],
      userId: { id: "1", email: "demo@brainly.app", name: "Demo User" },
      createdAt: new Date(2024, 11, 5).toDateString(),
    }
  ];


export default function Dashboard() {
  return (
    <>
     <Navbar />
      <Sidebar />
      <div className="main ml-64 pt-14">
        <div className="inside p-5">
          <div className="title mb-5">
            <p className="text-xl font-medium text-zinc-800">All Content</p>
            <p className="text-sm text-zinc-600">7 items</p>
          </div>
          <div className="card">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-col-3 gap-4">
              {sampleContents.map((content) => (
                <Card
                  key={content._id}
                  content={content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}