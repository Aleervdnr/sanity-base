import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { HEADER_QUERY } from "@/sanity/lib/queries";
import { HEADER_QUERYResult } from "@/sanity/types";

export async function Header() {
  const headerData: HEADER_QUERYResult | null = await client.fetch(
    HEADER_QUERY
  );

  // Valores por defecto si no hay configuración
  const logoHeight = headerData?.logoHeight || 70;
  const logoMaxWidth = headerData?.logoMaxWidth || 200;

  return (
    <header className="fixed z-50 w-full flex items-center justify-between px-16 py-2 rounded-lg mx-auto">
      <Link
        className="md:text-xl font-bold tracking-tight flex items-center gap-2"
        href="/"
      >
        {headerData?.logo ? (
          <Image
            src={urlFor(headerData.logo)
              .width(logoMaxWidth)
              .height(logoHeight)
              .url()}
            alt={headerData.logoText || "Logo"}
            width={logoMaxWidth}
            height={logoHeight}
            className="w-auto object-contain"
            style={{
              height: `${logoHeight}px`,
              maxWidth: `${logoMaxWidth}px`,
            }}
          />
        ) : null}
        {headerData?.logoText || null}
      </Link>

      <nav>
        <ul className="flex items-center gap-4 font-semibold text-slate-700">
          {headerData?.navigationItems?.map((item) => (
            <li key={item._key}>
              {item.isExternal ? (
                <a
                  className="transition-colors hover:text-pink-600"
                  href={`/${item.slug?.current}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  className="transition-colors hover:text-pink-600"
                  href={`/${item.slug?.current}`}
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
