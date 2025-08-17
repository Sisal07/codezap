import Image from "next/image";
import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";




const Page = () => {
  


  return (
   <div className="flex flex-col max-w-5xl mx-auto w-full">
    <section className="space-y-6 py-[16vh] 2xl:py-48">
      <div className="flex flex-col items-center">
        <Image src="/logo.svg" alt="codeZap" height={50} width={50} className="hidden md:block"
        />

      
      </div>
      <h1 className="text-2xl md:text-5xl font-bold text-center">
        Build Fast, Create Bold with CodeZap
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground text-center">
        create apps and websites with prompt
      </p>
      <div className="mx-w-3xl mx-auto w-full">
        <ProjectForm/>

      </div>

    </section>
    <ProjectsList/>
   </div>
  );
};

export default Page;