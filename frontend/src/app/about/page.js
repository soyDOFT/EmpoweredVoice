'use client'

export default function AboutPage() {
    return (
        <>
      <div className="bg-hero-paper h-[86vh] w-screen max:h-fit relative">
        <div className="hero-content text-start mb-1 absolute bottom-40 -right-[15%] max:left-0">
          <div className="h-[50vh] p-5 w-[50%] px-4 text-center">
            <h1 className="text-6xl text-page font-bold mb-6 500Max:text-5xl 400max:text-4xl 400max:text-center">
              Who we are
            </h1>
            <p className="py-8 text-page leading-7">
              Empowered Voice is a nonpartisan platform committed to enhancing voter knowledge and participation in North Carolina. Our mission is to provide accurate and accessible voting information to help citizens make informed choices at the polls. Through education, outreach, and advocacy, we aim to empower every voter and strengthen our democracy, ensuring that all voices are heard and represented in the electoral process.
            </p>
          </div>
        </div>
      </div>
      <main className=" my-28">
        <div className="flex flex-col items-center justify-center my-24">
        <h2 className="text-4xl font-bold mb-3 border-b-4 border-primary">Our mission</h2>
      <p className="text-lg leading-7 max-w-[75vmin]">
      Our mission is to empower every voter with the knowledge and tools they need to confidently participate in elections. We provide accurate and accessible voting information to help citizens make informed choices, strengthening our democracy and ensuring that all voices are heard and represented in the electoral process.
      </p>
        </div>
        <div className="flex flex-col items-center justify-center my-24">
        <h2 className="text-4xl font-bold mb-3 border-b-4 border-primary">What we do</h2>
      <p className="text-lg leading-7 max-w-[75vmin]">
      Our mission is to empower every voter with the knowledge and tools they need to confidently participate in elections. We provide accurate and accessible voting information to help citizens make informed choices, strengthening our democracy and ensuring that all voices are heard and represented in the electoral process.
      </p>
        </div>
      </main>




</>
    );
}

