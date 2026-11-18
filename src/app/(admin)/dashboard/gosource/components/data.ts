import { ChartJSOptionsType } from "@/components/wrappers/ChartJs";
import { getColor, getFont } from "@/utils/helpers";
import type { StaticImageData } from "next/image";
import user1 from "@/assets/images/users/user-1.jpg";
import user2 from "@/assets/images/users/user-2.jpg";
import user3 from "@/assets/images/users/user-3.jpg";
import user4 from "@/assets/images/users/user-4.jpg";
import user5 from "@/assets/images/users/user-5.jpg";
import user6 from "@/assets/images/users/user-6.jpg";
import user7 from "@/assets/images/users/user-7.jpg";
import user8 from "@/assets/images/users/user-8.jpg";
import user9 from "@/assets/images/users/user-9.jpg";
import user10 from "@/assets/images/users/user-10.jpg";
import visaCasesData from "./visa-cases.json";

export type VisaCase = {
  id: string;
  applicantName: string;
  avatar: StaticImageData;
  program: string;
  trade: string;
  referral: string;
  status: string;
  salary: string;
};

export type VisaStage =
  "Deployed" | "Visa / travel" | "In progress" | "Needs attention";

export type ProgramSummary = {
  program: string;
  applicants: number;
  deployed: number;
  visaTravel: number;
  inProgress: number;
  needsAttention: number;
};

const applicantAvatars = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  user10,
];

export const visaCases: VisaCase[] = visaCasesData.map((visaCase, index) => ({
  ...visaCase,
  avatar: applicantAvatars[index % applicantAvatars.length],
}));

export const getVisaStage = (status: string): VisaStage => {
  const normalized = status.trim().toLowerCase();

  if (normalized.startsWith("deployed")) return "Deployed";
  if (
    /miss flight|cancel|expire|objection|issue|fail|refuse|unfit|missing/.test(
      normalized,
    )
  )
    return "Needs attention";
  if (/ticket|visa stamped/.test(normalized)) return "Visa / travel";
  if (
    /under|process|submitted|medical|takamul|biometric|visa required|waiting|navtac/.test(
      normalized,
    )
  )
    return "In progress";

  return "Needs attention";
};

export const visaStageCounts: Record<VisaStage, number> = visaCases.reduce(
  (counts, visaCase) => {
    counts[getVisaStage(visaCase.status)] += 1;
    return counts;
  },
  { Deployed: 0, "Visa / travel": 0, "In progress": 0, "Needs attention": 0 },
);

export const statData = [
  {
    icon: "users-round",
    className: "bg-primary-subtle text-primary",
    value: visaCases.length,
    title: "Applicants",
  },
  {
    icon: "plane",
    className: "bg-success-subtle text-success",
    value: visaStageCounts.Deployed,
    title: "Deployed",
  },
  {
    icon: "clipboard-list",
    className: "bg-info-subtle text-info",
    value: visaStageCounts["In progress"],
    title: "In Progress",
  },
  {
    icon: "triangle-alert",
    className: "bg-warning-subtle text-warning",
    value: visaStageCounts["Needs attention"],
    title: "Needs Attention",
  },
];

export const programSummary: ProgramSummary[] = Array.from(
  visaCases.reduce((programs, visaCase) => {
    const summary = programs.get(visaCase.program) ?? {
      program: visaCase.program,
      applicants: 0,
      deployed: 0,
      visaTravel: 0,
      inProgress: 0,
      needsAttention: 0,
    };

    summary.applicants += 1;
    const stage = getVisaStage(visaCase.status);
    if (stage === "Deployed") summary.deployed += 1;
    if (stage === "Visa / travel") summary.visaTravel += 1;
    if (stage === "In progress") summary.inProgress += 1;
    if (stage === "Needs attention") summary.needsAttention += 1;
    programs.set(visaCase.program, summary);
    return programs;
  }, new Map<string, ProgramSummary>()),
  ([, summary]) => summary,
).sort((a, b) => b.applicants - a.applicants);

const programStageSeries: {
  label: VisaStage;
  key: "deployed" | "visaTravel" | "inProgress" | "needsAttention";
  color: string;
}[] = [
  { label: "Deployed", key: "deployed", color: "chart-primary" },
  { label: "Visa / travel", key: "visaTravel", color: "chart-secondary" },
  { label: "In progress", key: "inProgress", color: "chart-alpha" },
  { label: "Needs attention", key: "needsAttention", color: "chart-gray" },
];

export const programStagesChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: programSummary.map((summary) =>
      summary.program.replace("Majal Al Arabi ", "Majal "),
    ),
    datasets: programStageSeries.map((series) => ({
      type: "line",
      label: series.label,
      data: programSummary.map((summary) => summary[series.key]),
      borderColor:
        series.key === "needsAttention" ? "#d9536f" : getColor(series.color),
      backgroundColor:
        series.key === "needsAttention"
          ? "rgba(217, 83, 111, 0.18)"
          : getColor(`${series.color}-rgb`, 0.22),
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0.4,
      fill: true,
    })),
  },
  options: {
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { family: getFont() },
          color: getColor("secondary-color"),
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.y} applicants`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  },
});

const stages: VisaStage[] = [
  "Deployed",
  "Visa / travel",
  "In progress",
  "Needs attention",
];

export const visaStatusChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: stages,
    datasets: [
      {
        data: stages.map((stage) => visaStageCounts[stage]),
        backgroundColor: [
          getColor("chart-primary"),
          getColor("chart-secondary"),
          getColor("chart-alpha"),
          "#d9536f",
        ],
        borderColor: "transparent",
        borderWidth: 1,
        cutout: "62%",
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { family: getFont() },
          color: getColor("secondary-color"),
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed} applicants`,
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  },
});

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthNumbers: Record<string, number> = Object.fromEntries(
  monthLabels.map((month, index) => [month.toLowerCase(), index + 1]),
);

const scheduledMovement = visaCases.reduce((months, visaCase) => {
  const match = visaCase.status.match(
    /(?:deployed|ticket)\s+(\d{1,2})-([a-z]{3})-(\d{4})/i,
  );
  if (!match) return months;

  const [, , month, year] = match;
  const monthNumber = monthNumbers[month.toLowerCase()];
  if (!monthNumber) return months;

  const key = `${year}-${String(monthNumber).padStart(2, "0")}`;
  const movement = months.get(key) ?? {
    label: `${monthLabels[monthNumber - 1]} ${year}`,
    deployed: 0,
    ticketed: 0,
  };
  if (visaCase.status.trim().toLowerCase().startsWith("deployed"))
    movement.deployed += 1;
  else movement.ticketed += 1;
  months.set(key, movement);
  return months;
}, new Map<string, { label: string; deployed: number; ticketed: number }>());

const monthlyMovement = Array.from(scheduledMovement.entries())
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, movement]) => movement);

export const visaMovementChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: monthlyMovement.map((movement) => movement.label),
    datasets: [
      {
        type: "bar",
        label: "Deployed",
        data: monthlyMovement.map((movement) => movement.deployed),
        borderColor: getColor("chart-primary"),
        backgroundColor: getColor("chart-primary"),
        barThickness: 24,
        borderRadius: 6,
      },
      {
        type: "bar",
        label: "Ticket date recorded",
        data: monthlyMovement.map((movement) => movement.ticketed),
        borderColor: getColor("chart-secondary"),
        backgroundColor: getColor("chart-secondary"),
        barThickness: 24,
        borderRadius: 6,
      },
    ],
  },
});
