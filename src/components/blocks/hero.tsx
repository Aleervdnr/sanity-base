import { PortableText, stegaClean } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero({ title, text, image, alignment }: HeroProps) {
  const cleanAlignment = stegaClean(alignment) || "center";
  
  const textAlignClass = cleanAlignment === "left" ? "text-left" : cleanAlignment === "right" ? "text-right" : "text-center";
  
  return (
    <section
      className="isolate w-full h-screen aspect-2/1 py-16 px-20 relative overflow-hidden grid"
      data-alignment={cleanAlignment}
      style={{
        placeItems: cleanAlignment === "left" ? "start" : cleanAlignment === "right" ? "end" : "center"
      }}
    >
      <div className="relative flex flex-col justify-center items-center gap-8 h-full z-20 w-fit">
        {title ? (
          <h1 className={`text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white text-pretty max-w-sm lg:max-w-lg xl:max-w-xl ${textAlignClass}`}>
            {title}
          </h1>
        ) : null}
        <div className="prose-lg lg:prose-xl prose-invert flex items-end">
          {text ? <PortableText value={text} /> : null}
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      {image ? (
        <Image
          className="absolute inset-0 object-cover h-screen "
          src={urlFor(image).width(1600).height(800).url()}
          width={1600}
          height={800}
          alt=""
        />
      ) : null}
    </section>
  );
}
