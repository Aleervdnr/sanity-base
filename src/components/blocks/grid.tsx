import { stegaClean, createDataAttribute } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";

type GridProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "grid" }
> & {
  documentId?: string;
  documentType?: string;
  blockKey?: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function Grid({ title, columns, items, gap, documentId, documentType, blockKey }: GridProps) {
  const cleanColumns = stegaClean(columns) || 3;
  const cleanGap = stegaClean(gap) || "medium";

  // Define gap sizes
  const gapSizes = {
    small: "gap-4",
    medium: "gap-6",
    large: "gap-8",
  };

  // Define column classes based on the number of columns
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-4",
    5: "grid-cols-1  md:grid-cols-5",
    6: "grid-cols-1  md:grid-cols-6",
  };

  const gridColumnClass = columnClasses[cleanColumns as keyof typeof columnClasses] || columnClasses[3];
  const gapClass = gapSizes[cleanGap as keyof typeof gapSizes] || gapSizes.medium;

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}
        
        <div className={`grid ${gridColumnClass} ${gapClass}`}>
          {items?.map((item, index) => {
            const itemDataAttribute = documentId && documentType && blockKey
              ? createDataAttribute({
                  ...createDataAttributeConfig,
                  id: documentId,
                  type: documentType,
                  path: `content[_key=="${blockKey}"].items[${index}]`,
                }).toString()
              : undefined;

            return (
              <div
                key={item._key || index}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                data-sanity={itemDataAttribute}
              >
                {item.image && (
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={urlFor(item.image).width(600).height(600).url()}
                      alt={item.title || "Grid item"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {(item.title || item.description) && (
                  <div className="p-6">
                    {item.title && (
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
