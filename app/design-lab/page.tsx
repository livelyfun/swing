"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShopSun } from "@/components/motion/ShopSun";
import { HangingTag } from "@/components/motion/HangingTag";
import { Marquee } from "@/components/motion/Marquee";
import { Pressable } from "@/components/motion/Pressable";
import { Reveal } from "@/components/motion/Reveal";
import { StatusChip } from "@/components/motion/StatusChip";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export default function DesignLabPage() {
  const [isOpenState, setIsOpenState] = useState(true);

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#0E1540] pb-24">
      {/* Top Header */}
      <header className="border-b border-[#0E1540]/10 bg-[#0E1540] text-[#FFFBF0] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/es"
              className="text-xs uppercase font-mono tracking-wider text-[#FFD23F] hover:underline flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Tornar a la web
            </Link>
            <span className="text-stone-500">/</span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#FFFBF0]">
              DESIGN LAB (BLUE HOUR)
            </span>
          </div>

          <div className="text-xs font-mono text-[#FFFBF0]/60">
            Swing Forn de Pa · Design System Harness
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-10 space-y-16">
        {/* Section 1: Palette Tokens & Contrast */}
        <section className="space-y-6">
          <div className="border-b border-[#0E1540]/10 pb-3">
            <h2 className="text-2xl font-bold tracking-tight">1. Paleta &quot;Blue Hour&quot; i Tokens</h2>
            <p className="text-sm text-[#0E1540]/70">
              Tokens cromàtics basats en la matinada a Badalona. Ratis de contrast verificats segons WCAG 2.2 AA/AAA.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="p-4 rounded-xl bg-[#0E1540] text-[#FFFBF0] shadow-sm">
              <div className="text-xs font-mono opacity-70">night</div>
              <div className="text-sm font-bold font-mono">#0E1540</div>
              <div className="mt-4 text-[10px] uppercase tracking-wider text-[#FFD23F]">Canvas Fosc / Text</div>
            </div>

            <div className="p-4 rounded-xl bg-[#2236C8] text-[#FFFBF0] shadow-sm">
              <div className="text-xs font-mono opacity-70">hour</div>
              <div className="text-sm font-bold font-mono">#2236C8</div>
              <div className="mt-4 text-[10px] uppercase tracking-wider text-[#FFFBF0]">Cobalt / Marca</div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFBF0] text-[#0E1540] border border-[#0E1540]/20 shadow-sm">
              <div className="text-xs font-mono opacity-70">flour</div>
              <div className="text-sm font-bold font-mono">#FFFBF0</div>
              <div className="mt-4 text-[10px] uppercase tracking-wider text-[#2236C8]">Canvas Clar</div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFD23F] text-[#0E1540] shadow-sm">
              <div className="text-xs font-mono opacity-70">sun</div>
              <div className="text-sm font-bold font-mono">#FFD23F</div>
              <div className="mt-4 text-[10px] uppercase tracking-wider font-semibold">Disc Solar / Focus</div>
            </div>

            <div className="p-4 rounded-xl bg-[#F07A1F] text-[#0E1540] shadow-sm">
              <div className="text-xs font-mono opacity-70">crust</div>
              <div className="text-sm font-bold font-mono">#F07A1F</div>
              <div className="mt-4 text-[10px] uppercase tracking-wider font-semibold">Crosta / Botó</div>
            </div>

            <div className="p-4 rounded-xl bg-[#C9341F] text-[#FFFBF0] shadow-sm">
              <div className="text-xs font-mono opacity-70">tomato</div>
              <div className="text-sm font-bold font-mono">#C9341F</div>
              <div className="mt-4 text-[10px] uppercase tracking-wider">Temporada</div>
            </div>

            <div className="p-4 rounded-xl bg-[#CFE3C2] text-[#0E1540] shadow-sm">
              <div className="text-xs font-mono opacity-70">sage</div>
              <div className="text-sm font-bold font-mono">#CFE3C2</div>
              <div className="mt-4 text-[10px] uppercase tracking-wider font-semibold">Calma / Panellets</div>
            </div>
          </div>
        </section>

        {/* Section 2: Catalan Punctuation & Typography Guard */}
        <section className="space-y-6">
          <div className="border-b border-[#0E1540]/10 pb-3">
            <h2 className="text-2xl font-bold tracking-tight">2. Tipografia &amp; Prova del Punt Volat Català</h2>
            <p className="text-sm text-[#0E1540]/70">
              Verificació de renderitzat per a la ela geminada (l·l) sense trencaments de línia ni espaiat defectuós.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#0E1540]/10 space-y-4">
            <div className="text-sm text-stone-500 font-mono">Bricolage Grotesque (Display) + Plus Jakarta Sans (Body):</div>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1540]">
              La nova col·lecció de pans d&apos;obrador i brioixeria a Badalona.
            </h3>

            <p className="text-base text-[#0E1540]/80 leading-relaxed max-w-2xl">
              Hem elaborat una novel·la gastronòmica amb ingredients de proximitat. Consulta els al·lèrgens de cada
              especialitat amb total claredat i transparència segons la normativa europea UE 1169/2011.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
              <span className="p-2 bg-stone-100 rounded">col·lecció</span>
              <span className="p-2 bg-stone-100 rounded">al·lèrgens</span>
              <span className="p-2 bg-stone-100 rounded">novel·la</span>
              <span className="p-2 bg-stone-100 rounded">il·lusió</span>
            </div>
          </div>
        </section>

        {/* Section 3: Signature Moment — ShopSun */}
        <section className="space-y-6">
          <div className="border-b border-[#0E1540]/10 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">3. Moment Emblema: ShopSun (El Sol de Badalona)</h2>
              <p className="text-sm text-[#0E1540]/70">
                El disc solar s&apos;eleva o descendeix sobre l&apos;horitzó segons l&apos;horari d&apos;obertura en temps real.
              </p>
            </div>

            <button
              onClick={() => setIsOpenState(!isOpenState)}
              className="px-4 py-2 text-xs font-mono font-bold uppercase rounded-lg bg-[#2236C8] text-[#FFFBF0] hover:bg-[#0E1540] transition-colors"
            >
              Simula: {isOpenState ? "TANCAT (NIT)" : "OBERT (SOL)"}
            </button>
          </div>

          <ShopSun
            isOpen={isOpenState}
            statusLabel={isOpenState ? "Obert ara mateix" : "Tancat fins demà a les 06:00"}
            scheduleDetail="Dilluns a Divendres 06:00 – 21:00 · Caps de setmana 06:00 – 15:00"
            closingOrOpeningText={isOpenState ? "Obert fins a les 21:00 avui." : "L'obrador comença a fornejar a les 04:00."}
          />
        </section>

        {/* Section 4: Motion Primitives */}
        <section className="space-y-6">
          <div className="border-b border-[#0E1540]/10 pb-3">
            <h2 className="text-2xl font-bold tracking-tight">4. Primitius de Moviment &quot;Swing&quot;</h2>
            <p className="text-sm text-[#0E1540]/70">
              Etiquetes oscil·lants, marquee ambiental accessible i interaccions tàctils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hanging Tags */}
            <div className="p-6 rounded-2xl bg-white border border-[#0E1540]/10 space-y-4">
              <h4 className="font-bold text-sm text-[#0E1540]">Hanging Tags (Pèndol Swing)</h4>
              <p className="text-xs text-stone-500">Posa el cursor per activar l&apos;oscil·lació artesanal.</p>
              <div className="flex gap-4 items-end pt-4">
                <HangingTag label="Pa de Pagès" sublabel="IGP" variant="crust" />
                <HangingTag label="Panellets" sublabel="Tardor" variant="tomato" />
                <HangingTag label="Massa Mare" sublabel="24h" variant="hour" />
              </div>
            </div>

            {/* Zero-Pill Status Chips */}
            <div className="p-6 rounded-2xl bg-white border border-[#0E1540]/10 space-y-4">
              <h4 className="font-bold text-sm text-[#0E1540]">Zero-Pill Metadata Discipline</h4>
              <p className="text-xs text-stone-500">Sense pastilles genèriques ni càpsules candy.</p>
              <div className="space-y-3 pt-2">
                <StatusChip label="Obert en aquest moment" isOpen={true} variant="dot" />
                <div className="text-xs text-stone-600 flex items-center gap-2">
                  <span>Avda. Catalunya 39</span>
                  <span className="opacity-40">/</span>
                  <span>Badalona</span>
                  <span className="opacity-40">/</span>
                  <span className="font-mono text-[#2236C8] font-semibold">06:00 – 21:00</span>
                </div>
              </div>
            </div>

            {/* Pressables */}
            <div className="p-6 rounded-2xl bg-white border border-[#0E1540]/10 space-y-4">
              <h4 className="font-bold text-sm text-[#0E1540]">Pressables (Feedback tàctil &le; 200ms)</h4>
              <p className="text-xs text-stone-500">Amortiment físic precís sense retard.</p>
              <div className="flex flex-col gap-2 pt-2">
                <Pressable className="w-full">
                  <button className="w-full py-2.5 px-4 rounded-xl bg-[#F07A1F] text-[#0E1540] font-bold text-xs tracking-wide">
                    Botó Principal Crosta
                  </button>
                </Pressable>
                <Pressable className="w-full">
                  <button className="w-full py-2.5 px-4 rounded-xl bg-[#2236C8] text-[#FFFBF0] font-bold text-xs tracking-wide">
                    Botó Cobalt Hora Blava
                  </button>
                </Pressable>
              </div>
            </div>
          </div>

          {/* Marquee Ambient Loop */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#0E1540]">Marquee Ambiental (Pausa en hover/focus)</h4>
            <Marquee
              items={[
                "CAMPANYA DE CASTANYADA I PANELLETS A BADALONA",
                "PA DE PAGÈS CATALÀ TRADICIONAL",
                "BRIOIXERIA FORNEJADA CADA MATÍ DES DE LES 06:00",
                "AVDA. CATALUNYA 39",
              ]}
              variant="crust"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
