'use client'
import Card from '@/components/Card'
import Link from 'next/link'
export default function AboutPage() {
    return (
        <>
      <header className="bg-hero-paper h-[86vh] w-full  max:bg-hero-paper-tablet phoneMax:bg-hero-paper-mobile phoneMax:h-[100vh] relative">
        <div className="hero-content text-start mb-1 absolute bottom-40 phoneMax:bottom-[24rem] left-[55%] max:left-[25%]">
          <div className="h-[50vh] p-5 w-[70%] px-4 text-center">
            <h1 className="text-6xl text-page font-bold mb-6 500Max:text-5xl 400max:text-4xl 400max:text-center">
              Who we are
            </h1>
            <p className="py-8 text-page text-xl leading-7 phoneMax:text-[1.1rem]">
              Empowered Voice is a nonpartisan platform committed to enhancing voter knowledge and participation in North Carolina. Our mission is to provide accurate and accessible voting information to help citizens make informed choices at the polls. Through education, outreach, and advocacy, we aim to empower every voter and strengthen our democracy, ensuring that all voices are heard and represented in the electoral process.
            </p>
          </div>
        </div>
      </header>
      <main className=" my-28">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card  rounded-box grid h-52 phoneMax:h-96 flex-grow place-items-center">
          <h2 className="text-4xl font-bold mb-3 border-b-4 border-primary">Our mission</h2>
          <p className="text-lg leading-7 max-w-[75vmin]">
          Our mission is to empower every voter with the knowledge and tools they need to confidently participate in elections. We provide accurate and accessible voting information to help citizens make informed choices, strengthening our democracy and ensuring that all voices are heard and represented in the electoral process.
          </p>
        </div>
        <div className="divider lg:divider-horizontal max:hidden" ></div>
        <div className="card  rounded-box grid h-52 flex-grow place-items-center 320Max:my-10">
          <h2 className="text-4xl font-bold mb-3 border-b-4 border-primary">Our Vision</h2>
          <p className="text-lg leading-7 max-w-[75vmin]">
          We envision a future where every eligible voter in North Carolina feels prepared and confident on Election Day. By providing a trusted source of nonpartisan information, we aim to foster a more informed and engaged electorate, one that reflects the diverse voices of our state.        </p>
        </div>
      </div>
        <div className="flex flex-col items-center justify-center my-24 320Max:mt-28">
        <h2 className="text-4xl font-bold mb-3 border-b-4 border-primary">What we do</h2>
      <p className="text-lg leading-7 max-w-[75vmin]">
      Our mission is to empower every voter with the knowledge and tools they need to confidently participate in elections. We provide accurate and accessible voting information to help citizens make informed choices, strengthening our democracy and ensuring that all voices are heard and represented in the electoral process.
      </p>
        </div>
      <div className="flex  md:flex-row  655Max:flex-col justify-center my-24 w-full">
      <Card
      number={"01"}
      title={"Educate"}
      paragraph={"We offer a comprehensive guide that covers key dates, voter registration, and detailed candidate profiles, helping voters understand who is running for office and where they stand on important issues."}
      image={"/icons/educate.png"}
      />
            <Card
      number={"02"}
      title={"Engage"}
      paragraph={" Through outreach and advocacy, we strive to engage the community and encourage active participation in the electoral process."}
      image={"/icons/engage.png"}
      />
            <Card
      number={"03"}
      title={"Empower"}
      paragraph={"Our platform is designed to empower voters by breaking down barriers to information, making it easier for everyone, especially first-time voters, to participate in democracy."}
      image={"/icons/empower.png"}
      />
      </div>
      <section className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 md:h-full">
            <img
              src="/about-images/RegisterBlog.jpg?height=400&width=600"
              alt="Voting illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Make Your Voice Heard
            </h2>
            <p className="text-xl text-white">
              Your vote matters! Register today and be part of shaping our future. It's quick, easy, and your civic duty.
            </p>
            <div className="pt-4">
              <Link href="/register">
                <button className="btn w-full sm:w-auto rounded-xl  text-white border-none bg-primary mt-4 max:mt-20 text-xl hover:bg-[#1803fe] h-12">
                  Register to Vote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
      </main>



</>
    );
}

