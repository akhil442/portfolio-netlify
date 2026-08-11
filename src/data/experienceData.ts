export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  displayDates: string;
  shortSummary: string;
  achievements: string[];
  primaryTechnologies: string[];
  allTechnologies: string[];
  roleAreas: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: 'unh',
    company: 'University of New Haven',
    companyUrl: 'https://www.newhaven.edu',
    title: 'Graduate Research Assistant',
    location: 'West Haven, Connecticut, United States',
    startDate: '2026-01',
    endDate: '2026-05',
    displayDates: 'Jan 2026 — May 2026',
    shortSummary:
      'Conducted deep-learning research for automated brain tumor segmentation from multimodal MRI, developing a two-stage 3D U-Net/SegResNet pipeline, robustness techniques, and uncertainty-quantification methods using PyTorch and MONAI.',
    achievements: [
      'Designed and implemented a two-stage 3D U-Net → 3D SegResNet cascade for automated brain tumor segmentation using the BraTS 2021 dataset.',
      'Developed a stochastic bounding-box perturbation technique to reduce train-test distribution mismatch and improve cascade segmentation robustness.',
      'Implemented Monte Carlo Dropout for uncertainty quantification and evaluated uncertainty estimates using the QU-BraTS scoring framework.',
      'Performed stratified evaluation across small, medium, and large tumor subgroups to identify performance patterns hidden by aggregate segmentation metrics.',
      'Co-authored the resulting research manuscript covering methodology, experiments, results, and discussion under faculty supervision.'
    ],
    primaryTechnologies: ['Python', 'PyTorch', 'MONAI', 'Deep Learning', 'Medical Imaging'],
    allTechnologies: [
      'Python',
      'PyTorch',
      'MONAI',
      '3D U-Net',
      '3D SegResNet',
      'Deep Learning',
      'Medical Image Segmentation',
      'Multimodal MRI',
      'Monte Carlo Dropout',
      'Uncertainty Quantification',
      'RunPod',
      'Matplotlib',
      'Seaborn'
    ],
    roleAreas: [
      'Machine Learning Research',
      'Deep Learning',
      'Medical Imaging',
      'Healthcare AI',
      'Data Science'
    ]
  },
  {
    id: 'fifth-third',
    company: 'Fifth Third Bank',
    companyUrl: 'https://www.53.com/content/fifth-third/en.html',
    title: 'Data Engineer — Contract',
    location: 'Cincinnati, Ohio, United States',
    startDate: '2025-05',
    endDate: '2025-08',
    displayDates: 'May 2025 — Aug 2025',
    shortSummary:
      'Supported enterprise banking data platforms by developing Python and SQL ETL/ELT pipelines, Snowflake/dbt transformations, data-quality controls, incremental data loads, and Airflow workflows for analytics, fraud detection, and machine-learning use cases.',
    achievements: [
      'Developed production ETL/ELT pipelines to ingest, transform, validate, and deliver enterprise banking data for analytics and machine-learning workflows.',
      'Implemented incremental data-loading processes to minimize unnecessary full-table processing against production systems.',
      'Built automated data-quality controls covering duplicate records, null values, schema changes, invalid dates, and failed pipeline loads.',
      'Developed reusable SQL feature datasets containing transaction aggregates, customer behavior metrics, rolling-window calculations, and historical activity features for Data Science teams.',
      'Optimized Snowflake/dbt transformations and troubleshot Airflow workflows supporting high-volume banking datasets.'
    ],
    primaryTechnologies: ['Python', 'SQL', 'Snowflake', 'dbt', 'Airflow', 'AWS'],
    allTechnologies: [
      'Python',
      'SQL',
      'Snowflake',
      'dbt',
      'Apache Airflow',
      'AWS',
      'Amazon S3',
      'PostgreSQL',
      'Oracle',
      'ETL/ELT',
      'Data Warehousing',
      'Data Modeling',
      'Incremental Data Loading',
      'Data Quality',
      'Feature Engineering',
      'Git',
      'GitHub',
      'Docker',
      'Jira',
      'Confluence',
      'CI/CD'
    ],
    roleAreas: [
      'Data Engineering',
      'Data Analytics',
      'Machine Learning Data Pipelines',
      'Cloud/Data Infrastructure',
      'Fraud Analytics',
      'Banking / Financial Services'
    ]
  },
  {
    id: 'vunet',
    company: 'VuNet Systems',
    companyUrl: 'https://vunetsystems.com/',
    title: 'Data Science Intern',
    location: 'Bengaluru, Karnataka, India',
    startDate: '2024-01',
    endDate: '2024-05',
    displayDates: 'Jan 2024 — May 2024',
    shortSummary:
      'Supported an AI-powered observability platform through telemetry data preparation, data-quality validation, feature engineering, machine-learning experimentation, SQL optimization, and production API validation.',
    achievements: [
      'Developed Python/Pandas/NumPy preprocessing utilities to detect duplicate telemetry records, missing values, malformed timestamps, and schema inconsistencies.',
      'Optimized PostgreSQL transformations using CTEs, joins, window functions, and aggregations for analytics and ML workflows.',
      'Built reusable preprocessing and feature-engineering utilities for missing-value handling, categorical encoding, timestamp normalization, and rolling-window features.',
      'Supported model evaluation and experimentation by preparing datasets and comparing classification and anomaly-detection performance.',
      'Developed Power BI dashboards to monitor data-quality issues, pipeline failures, anomaly trends, and model-related metrics.'
    ],
    primaryTechnologies: ['Python', 'SQL', 'Pandas', 'PostgreSQL', 'Scikit-learn', 'Power BI'],
    allTechnologies: [
      'Python',
      'SQL',
      'Pandas',
      'NumPy',
      'PostgreSQL',
      'Scikit-learn',
      'MLflow',
      'Power BI',
      'Docker',
      'Kubernetes',
      'Git',
      'GitHub',
      'Jira',
      'VS Code',
      'Anomaly Detection',
      'Feature Engineering',
      'Data Validation',
      'Telemetry Analytics'
    ],
    roleAreas: [
      'Data Science',
      'Machine Learning',
      'Data Analytics',
      'Data Engineering',
      'Observability / Enterprise Software'
    ]
  }
];
