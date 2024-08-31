export default function Home() {
  return (
    <div className="main-text flex flex-col items-center justify-center bg-hero bg-cover bg-center">
      <div className="hero-content text-center mb-12">
        <div className="max-w-100vw px-4">
          <h1 className="text-6xl text-white font-bold font-Prata mb-6">
            Empowering Voices
          </h1>
          <p className="py-8 text-white">
            Empowering Voices is a nonpartisan platform committed to enhancing voter knowledge and participation in North Carolina. Our mission is to provide accurate and accessible voting information to help citizens make informed choices at the polls. Through education, outreach, and advocacy, we aim to empower every voter and strengthen our democracy, ensuring that all voices are heard and represented in the electoral process.
          </p>
          <button className="btn text-white btn-primary">Get Started</button>
        </div>
      </div>
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white shadow-md rounded-lg p-6 min-h-[200px]">
            <h2 className="text-xl font-semibold mb-4">Protect the freedom to Vote</h2>
            <p className="text-gray-700">Ensure all Americans have the equal opportunity to exercise their right to vote </p>
          </div>
          <div className="card bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Improve elections</h2>
            <p className="text-gray-700">Imforme our voters and help make our elections more free,fair and equitable</p>
          </div>
          <div className="card bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Card Title 3</h2>
            <p className="text-gray-700">This is a description for card 3</p>
          </div>
          <div className="card bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Card Title 4</h2>
            <p className="text-gray-700">This is a description for card 4.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
