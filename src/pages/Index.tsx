import Icon from "@/components/ui/icon";

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

const typeStyle: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  requirement: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "Sparkles",
  },
  decision: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    icon: "CheckCircle",
  },
  cancelled: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "XCircle",
  },
  limit: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    icon: "AlertTriangle",
  },
  risk: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-800",
    icon: "ShieldAlert",
  },
};

const statusConfig: Record<string, { dot: string; pill: string; label: string; icon: string }> = {
  revised: {
    dot: "bg-amber-400 ring-amber-100",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Пересмотрено",
    icon: "RefreshCw",
  },
  cancelled: {
    dot: "bg-red-500 ring-red-100",
    pill: "bg-red-50 text-red-700 border-red-200",
    label: "Отказ от решения",
    icon: "XCircle",
  },
  blocked: {
    dot: "bg-slate-300 ring-slate-100",
    pill: "bg-slate-50 text-slate-500 border-slate-200",
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

export default function Index() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-golos flex flex-col">
      <div className="w-full max-w-[1440px] mx-auto px-10 py-8 flex flex-col flex-1">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-1">
              Дорожная карта · Служба
            </p>
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">
              Аналитика «Служб»
            </h1>
            <p className="text-[13px] text-slate-400 mt-1.5">
              06 марта — 20 марта 2026 &nbsp;·&nbsp; Система планирования персонала
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 flex-wrap justify-end mt-1">
            {legend.map((l) => {
              const s = typeStyle[l.type];
              return (
                <div
                  key={l.type}
                  className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${s.bg} ${s.border} ${s.text}`}
                >
                  <Icon name={s.icon} size={10} />
                  {l.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-slate-200 mb-8" />

        {/* ── Timeline ── */}
        <div className="relative flex-1">

          {/* Horizontal connector line */}
          <div
            className="absolute z-0"
            style={{ top: "20px", left: "calc(100%/12)", right: "calc(100%/12)", height: "1px", background: "linear-gradient(to right, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%)" }}
          />

          <div className="relative z-10 grid grid-cols-6 gap-3">
            {meetings.map((m, idx) => {
              const sc = statusConfig[m.status];
              return (
                <div key={idx} className="flex flex-col">

                  {/* Dot + date */}
                  <div className="flex flex-col items-center mb-4">
                    <div
                      className={`w-5 h-5 rounded-full ring-4 mb-2 shadow-sm ${sc.dot}`}
                    />
                    <span className="text-[11px] font-bold text-slate-500 tracking-wide">
                      {m.date}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex flex-col gap-2.5 flex-1">

                    {/* Meeting title + status pill */}
                    <div>
                      <p className="text-[12px] font-bold text-slate-800 leading-snug mb-1.5">
                        {m.title}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.pill}`}
                      >
                        <Icon name={sc.icon} size={9} />
                        {sc.label}
                      </span>
                    </div>

                    {/* Content blocks */}
                    <div className="flex flex-col gap-1.5">
                      {m.content.map((item, i) => {
                        const s = typeStyle[item.type];
                        return (
                          <div
                            key={i}
                            className={`rounded-xl border px-2.5 py-2 ${s.bg} ${s.border}`}
                          >
                            <div className={`flex items-center gap-1 mb-1 ${s.text}`}>
                              <Icon name={s.icon} size={10} />
                              <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">
                                {item.label}
                              </span>
                            </div>
                            <p className={`text-[10px] leading-[1.55] ${s.text} opacity-85`}>
                              {item.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
          <Icon name="Info" size={12} className="text-slate-400 shrink-0" />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-red-500">Красным</span> — точки отказа или пересмотра ранее принятых решений.&nbsp;
            Техническая реализация приостановлена до получения финального бизнес-решения.
          </p>
        </div>
      </div>
    </div>
  );
}
