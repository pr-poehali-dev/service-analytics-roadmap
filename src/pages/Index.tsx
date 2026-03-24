import Icon from "@/components/ui/icon";
import { useState } from "react";

const meetings = [
  {
    date: "06.03",
    title: "Установочная встреча",
    status: "revised",
    content: [
      {
        type: "requirement",
        label: "Новое требование",
        text: "С 01.03.2026 отели переходят на единые целевые структуры служб планирования, которые должны быть учтены в решении.",
      },
      {
        type: "decision",
        label: "Принятое решение",
        text: "Реализация сущности «Служба» как новый справочник — предварительная и может быть пересмотрена по результатам анализа целевых структур Заказчика.",
      },
    ],
  },
  {
    date: "11.03",
    title: "Рабочая встреча",
    status: "cancelled",
    content: [
      {
        type: "cancelled",
        label: "Отказ от решения 06.03",
        text: "Предварительное решение отменено. Отказаться от создания нового самостоятельного справочника «Службы».",
      },
      {
        type: "limit",
        label: "Ограничение",
        text: "Все процессы планирования завязаны на «Подразделения». Встреча без ключевого держателя требований — решение не зафиксировано.",
      },
      {
        type: "risk",
        label: "Риск",
        text: "Реализация на «Подразделения» + «Направления деятельности» может привести к отказу от части требований ТЗ: планирование по группам, ограничение должностей, корректный план-факт.",
      },
    ],
  },
  {
    date: "16.03",
    title: "Обсуждение ключевых аналитик",
    status: "revised",
    content: [
      {
        type: "requirement",
        label: "Новое требование",
        text: "Система планирования должна вписываться в существующую бюджетную модель.",
      },
      {
        type: "decision",
        label: "Принятое решение",
        text: "Использовать справочник «Подразделения организации». Ограничить видимость подразделений для конкретных пользователей-планировщиков.",
      },
      {
        type: "risk",
        label: "Риск",
        text: "Вынужденный отказ от части требований ТЗ из-за негибкости справочника. Дополнительные трудозатраты на согласовании макетов и опытной эксплуатации.",
      },
    ],
  },
  {
    date: "17.03",
    title: "Встреча с архитекторами",
    status: "revised",
    content: [
      {
        type: "cancelled",
        label: "Пересмотр решения 16.03",
        text: "Предложено использовать «Направление деятельности» как дополнительную сквозную аналитику к показателю.",
      },
      {
        type: "limit",
        label: "Ограничение",
        text: "Вопрос выбора аналитики «Служба» выносится на встречу с бизнес-заказчиком для финального согласования.",
      },
      {
        type: "risk",
        label: "Риск сдвига сроков",
        text: "До подтверждения бизнес-решения техническая реализация приостанавливается во избежание переделок.",
      },
    ],
  },
  {
    date: "19.03",
    title: "Встреча с Бизнесом",
    status: "cancelled",
    content: [
      {
        type: "cancelled",
        label: "Отказ от решения 17.03",
        text: "Не использовать «Направление деятельности» в качестве аналога служб.",
      },
      {
        type: "limit",
        label: "Ограничение",
        text: "Исполнитель моделирует два варианта: на разных видах отчёта; на одном виде с разными бланками и сводными таблицами.",
      },
      {
        type: "risk",
        label: "Риск сдвига сроков",
        text: "Техническая реализация приостановлена до подтверждения бизнес-решения.",
      },
    ],
  },
  {
    date: "20.03",
    title: "Встреча с Бизнесом",
    status: "blocked",
    content: [
      {
        type: "limit",
        label: "Ограничение",
        text: "Вопрос не был заявлен к обсуждению в силу тайминга встречи (30 мин).",
      },
    ],
  },
];

const typeConfig: Record<string, { bg: string; iconBg: string; text: string; icon: string; accent: string }> = {
  requirement: {
    bg: "bg-[#EEF4FF]",
    iconBg: "bg-[#3B82F6]",
    text: "text-[#1E40AF]",
    accent: "#3B82F6",
    icon: "Sparkles",
  },
  decision: {
    bg: "bg-[#ECFDF5]",
    iconBg: "bg-[#10B981]",
    text: "text-[#065F46]",
    accent: "#10B981",
    icon: "CheckCircle",
  },
  cancelled: {
    bg: "bg-[#FEF2F2]",
    iconBg: "bg-[#EF4444]",
    text: "text-[#991B1B]",
    accent: "#EF4444",
    icon: "XCircle",
  },
  limit: {
    bg: "bg-[#FFFBEB]",
    iconBg: "bg-[#F59E0B]",
    text: "text-[#92400E]",
    accent: "#F59E0B",
    icon: "AlertTriangle",
  },
  risk: {
    bg: "bg-[#F5F3FF]",
    iconBg: "bg-[#8B5CF6]",
    text: "text-[#5B21B6]",
    accent: "#8B5CF6",
    icon: "ShieldAlert",
  },
};

const statusConfig: Record<string, { color: string; bg: string; label: string; icon: string; border: string }> = {
  revised: {
    color: "text-amber-600",
    bg: "bg-amber-500",
    border: "border-amber-300",
    label: "Пересмотрено",
    icon: "RefreshCw",
  },
  cancelled: {
    color: "text-red-600",
    bg: "bg-red-500",
    border: "border-red-300",
    label: "Отказ от решения",
    icon: "XCircle",
  },
  blocked: {
    color: "text-slate-500",
    bg: "bg-slate-400",
    border: "border-slate-300",
    label: "Не рассмотрено",
    icon: "Clock",
  },
};

const legend = [
  { type: "requirement", label: "Требование" },
  { type: "decision", label: "Решение" },
  { type: "cancelled", label: "Отказ / Пересмотр" },
  { type: "limit", label: "Ограничение" },
  { type: "risk", label: "Риск" },
];

const stats = {
  total: 6,
  cancelled: 2,
  risks: 5,
  pending: 1,
};

function StatCard({ number, label, icon, color }: { number: number; label: string; icon: string; color: string }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${color}`}>
        <Icon name={icon} size={20} />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-slate-800 leading-none">{number}</p>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function Index() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-golos">
      <div className="w-full max-w-[1480px] mx-auto px-8 py-6">

        {/* ── Header row ── */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Icon name="Route" size={16} className="text-white" />
              </div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
                Дорожная карта
              </p>
            </div>
            <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Ключевая аналитика — Службы
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              06 — 20 марта 2026 &middot; Система планирования персонала
            </p>
          </div>

          {/* Legend pills */}
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {legend.map((l) => {
              const s = typeConfig[l.type];
              return (
                <div
                  key={l.type}
                  className={`flex items-center gap-1.5 text-[11px] font-semibold pl-1.5 pr-2.5 py-1 rounded-full ${s.bg} ${s.text}`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${s.iconBg}`}>
                    <Icon name={s.icon} size={9} className="text-white" />
                  </div>
                  {l.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <StatCard number={stats.total} label="Встреч проведено" icon="Users" color="bg-blue-500" />
          <StatCard number={stats.cancelled} label="Отказов от решений" icon="XCircle" color="bg-red-500" />
          <StatCard number={stats.risks} label="Выявлено рисков" icon="ShieldAlert" color="bg-violet-500" />
          <StatCard number={stats.pending} label="Ожидает решения" icon="Clock" color="bg-amber-500" />
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Connecting line with gradient */}
          <div className="absolute z-0" style={{
            top: "28px",
            left: "calc(100%/12)",
            right: "calc(100%/12)",
            height: "4px",
            borderRadius: "2px",
            background: "linear-gradient(to right, #3B82F6, #EF4444, #F59E0B, #8B5CF6, #EF4444, #94A3B8)"
          }} />

          {/* Arrow markers on line between cancelled meetings */}
          <div className="relative z-10 grid grid-cols-6 gap-3">
            {meetings.map((m, idx) => {
              const sc = statusConfig[m.status];
              const isExpanded = expandedCard === idx;

              return (
                <div key={idx} className="flex flex-col">

                  {/* Date node */}
                  <div className="flex flex-col items-center mb-3">
                    <div
                      className={`w-7 h-7 rounded-full border-[3px] border-white shadow-md flex items-center justify-center ${sc.bg}`}
                    >
                      <Icon name={sc.icon} size={12} className="text-white" />
                    </div>
                    <div className="mt-1.5 bg-white rounded-lg px-2 py-0.5 shadow-sm">
                      <span className="text-[12px] font-extrabold text-slate-700">{m.date}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col flex-1 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setExpandedCard(isExpanded ? null : idx)}
                  >
                    {/* Card header with colored top stripe */}
                    <div
                      className="h-1.5"
                      style={{
                        background: m.status === "cancelled"
                          ? "#EF4444"
                          : m.status === "revised"
                            ? "#F59E0B"
                            : "#94A3B8",
                      }}
                    />

                    <div className="p-3 flex flex-col gap-2 flex-1">
                      <div>
                        <p className="text-[13px] font-bold text-slate-800 leading-snug">
                          {m.title}
                        </p>
                        <div className={`inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold ${sc.color}`}>
                          <Icon name={sc.icon} size={11} />
                          {sc.label}
                        </div>
                      </div>

                      {/* Tags summary */}
                      <div className="flex flex-wrap gap-1">
                        {m.content.map((item, i) => {
                          const tc = typeConfig[item.type];
                          return (
                            <div
                              key={i}
                              className={`flex items-center gap-1 text-[9px] font-bold pl-0.5 pr-1.5 py-0.5 rounded-full ${tc.bg} ${tc.text}`}
                            >
                              <div
                                className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                                style={{ background: tc.accent }}
                              >
                                <Icon name={tc.icon} size={7} className="text-white" />
                              </div>
                              <span className="truncate max-w-[80px]">{item.label}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Expanded detail */}
                      <div className={`flex flex-col gap-1.5 transition-all duration-300 ${isExpanded ? "max-h-[600px] opacity-100 mt-1" : "max-h-0 opacity-0 overflow-hidden"}`}>
                        {m.content.map((item, i) => {
                          const tc = typeConfig[item.type];
                          return (
                            <div
                              key={i}
                              className={`rounded-xl p-2.5 ${tc.bg}`}
                              style={{ borderLeft: `3px solid ${tc.accent}` }}
                            >
                              <div className={`flex items-center gap-1.5 mb-1 ${tc.text}`}>
                                <Icon name={tc.icon} size={11} />
                                <span className="text-[10px] font-extrabold uppercase tracking-wider">
                                  {item.label}
                                </span>
                              </div>
                              <p className={`text-[10px] leading-relaxed ${tc.text} opacity-80`}>
                                {item.text}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Expand hint */}
                      <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 font-medium mt-auto pt-1">
                        <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={10} />
                        {isExpanded ? "Свернуть" : "Подробнее"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-5 bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
            <Icon name="AlertOctagon" size={16} className="text-white" />
          </div>
          <p className="text-[12px] text-slate-600 leading-relaxed">
            <span className="font-bold text-red-600">Техническая реализация приостановлена</span> — за 6 встреч произошло <span className="font-bold">2 полных отказа</span> от решений. Ожидается финальное бизнес-решение для возобновления работ.
          </p>
        </div>
      </div>
    </div>
  );
}
