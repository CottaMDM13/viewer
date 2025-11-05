import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";
import { Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home(props: any) {
  // searchParams vem do Next; tratamos aqui dentro
  const searchParams = (props?.searchParams ?? {}) as { tab?: string };

  const projetos: Project[] = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  const tab = searchParams.tab === "edu" ? "edu" : "desenvolve";

  const filtrados =
    tab === "desenvolve"
      ? projetos.filter((p) => p.apiKeyName === "Projeto Desenvolve")
      : projetos.filter((p) => p.apiKeyName === ".Edu");

  const totalDesenvolve = projetos.filter(
    (p) => p.apiKeyName === "Projeto Desenvolve"
  ).length;
  const totalEdu = projetos.filter((p) => p.apiKeyName === ".Edu").length;

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-50 font-inter">
      <div className="w-full px-4 sm:px-8 lg:px-16 py-10 min-h-screen flex flex-col">
        {/* fundo suave baseado na logo */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 left-10 h-56 w-56 bg-[#0ea5e9]/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-20 h-72 w-72 bg-[#facc15]/18 blur-3xl rounded-full" />
        </div>

        {/* HEADER AJUSTADO */}
        <header className="relative mb-10 flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* BLOCO DE TEXTO À ESQUERDA */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#facc15] font-semibold">
              Núcleo de Inovação e Criatividade
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-1 bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#facc15] bg-clip-text text-transparent">
              Vitrine de Projetos
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
              Explore os projetos separados por ambiente. Clique em um card para
              abrir; quando houver documentação, baixe o PDF diretamente pelo
              card.
            </p>
          </div>

          {/* LOGO MAIOR E NO CANTO DIREITO */}
          <div className="fixed top-5 right-10 z-50">
            <div className="relative h-32 w-32 md:h-36 md:w-36">
              <Image
                src="/nic-logo.png"
                alt="NIC - Núcleo de Inovação e Criatividade"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </header>

        {/* ABAS CENTRALIZADAS */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex items-center justify-center gap-10 border-b border-slate-700/70 pb-1">
            <Link
              href="/?tab=desenvolve"
              replace
              className={`pb-2 text-sm font-semibold transition-all ${
                tab === "desenvolve"
                  ? "text-[#38bdf8]"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              Projeto Desenvolve
              <span
                className={`ml-2 px-2 py-[2px] rounded-full text-[11px] ${
                  tab === "desenvolve"
                    ? "bg-[#1d4ed8]/30 text-[#e5f2ff]"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {totalDesenvolve}
              </span>
            </Link>

            <Link
              href="/?tab=edu"
              replace
              className={`pb-2 text-sm font-semibold transition-all ${
                tab === "edu"
                  ? "text-[#38bdf8]"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              .Edu
              <span
                className={`ml-2 px-2 py-[2px] rounded-full text-[11px] ${
                  tab === "edu"
                    ? "bg-[#1d4ed8]/30 text-[#e5f2ff]"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {totalEdu}
              </span>
            </Link>

            {/* linha animada NIC */}
            <span
              className={`absolute bottom-0 h-[2px] w-32 rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#facc15] transition-all duration-300 ${
                tab === "desenvolve" ? "left-[8%]" : "left-[56%]"
              }`}
            />
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 flex flex-col">
          {filtrados.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-400 text-sm">
                Nenhum projeto cadastrado nessa categoria.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((proj) => (
                <article
                  key={proj.id}
                  className="group rounded-2xl border border-slate-800 bg-[#101827] hover:bg-[#111827] shadow-sm hover:shadow-[#1d4ed8]/30 transition-all overflow-hidden"
                >
                  {/* faixa superior NIC */}
                  <div className="h-1.5 bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#facc15]" />

                  <a
                    href={proj.hostingUrl || "#"}
                    className="block px-5 py-5 space-y-3"
                  >
                    <h3 className="text-base font-semibold text-slate-50 group-hover:text-[#38bdf8] transition-colors">
                      {proj.name}
                    </h3>

                    {proj.author && (
                      <p className="text-xs text-slate-400">
                        por{" "}
                        <span className="font-medium text-slate-200">
                          {proj.author}
                        </span>
                      </p>
                    )}

                    <p className="text-sm text-slate-300">
                      {proj.description || "Sem descrição disponível."}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="px-2 py-1 text-[11px] rounded-full bg-slate-900/70 text-slate-200 border border-slate-700">
                        {proj.apiKeyName}
                      </span>
                    </div>
                  </a>

                  {proj.docUrl && (
                    <div className="px-5 pb-3 pt-1 border-t border-slate-800/80 bg-[#0f172a]">
                      <a
                        href={proj.docUrl}
                        download
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#38bdf8] hover:text-[#7dd3fc]"
                      >
                        <Download size={12} />
                        Baixar documentação (PDF)
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </main>

        {/* RODAPÉ */}
        <footer className="mt-16 border-t border-slate-800 pt-4 text-[11px] text-slate-400 flex flex-wrap justify-between gap-2">
          <span>NIC • Vitrine de Projetos</span>
          <span>
            © {new Date().getFullYear()} — NIC · Núcleo de Inovação e Criatividade
          </span>
        </footer>
      </div>
    </div>
  );
}
