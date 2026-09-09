'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'Real-Time Order Intelligence',
    description: 'Designed and built an end-to-end real-time data pipeline simulating an e-commerce system using Kafka and Spark Structured Streaming. Implemented validation and clean vs quarantine separation.',
    tags: ['Kafka', 'Spark', 'FastAPI', 'Prometheus'],
    link: 'https://github.com/akhil442/Real-Time-Order-Intelligence-Pipeline.git',
    github: 'https://github.com/akhil442/Real-Time-Order-Intelligence-Pipeline.git'
  },
  {
    id: '02',
    title: 'SLA Monitoring Dashboard',
    description: 'Built a two-layer AWS SLA monitoring system: pipeline freshness and business delivery SLA, exposed via a single API and a Streamlit dashboard.',
    tags: ['AWS', 'Athena', 'Streamlit', 'Python'],
    link: 'https://github.com/akhil442/SLA-FRESHNESS-DASHBOARD-USING-AWS',
    github: 'https://github.com/akhil442/SLA-FRESHNESS-DASHBOARD-USING-AWS'
  },
  {
    id: '03',
    title: 'Azure Sales Analytics ETL',
    description: 'Engineered a scalable Azure-based ETL pipeline to process raw sales data through Bronze, Silver, and Gold layers using Azure Data Factory and SQL.',
    tags: ['Azure', 'Power BI', 'ETL', 'SQL'],
    link: 'https://github.com/akhil442/End-to-End-ETL-pipeline-Azure',
    github: 'https://github.com/akhil442/End-to-End-ETL-pipeline-Azure'
  },
  {
    id: '04',
    title: 'Tesla Sentiment Analysis',
    description: 'Predicted Tesla stock movement by combining historical stock data with real-time news sentiment using AWS machine learning workflows and Streamlit.',
    tags: ['ML Classification', 'AWS', 'Python'],
    link: 'https://github.com/akhil442/Real-Time-Tesla-Stock-Sentiment-Analysis-and-Prediction-Using-AWS-Machine-Learning',
    github: 'https://github.com/akhil442/Real-Time-Tesla-Stock-Sentiment-Analysis-and-Prediction-Using-AWS-Machine-Learning'
  },
  {
    id: '05',
    title: 'RFM Customer Segmentation',
    description: 'Performed Recency, Frequency, and Monetary analysis using SQL in Google BigQuery to segment customers. Built a Power BI dashboard to visualize key KPIs.',
    tags: ['BigQuery', 'SQL', 'Power BI'],
    link: 'https://github.com/akhil442/RFM-Customer-Segmentation.git',
    github: 'https://github.com/akhil442/RFM-Customer-Segmentation.git'
  },
  {
    id: '06',
    title: 'Semantic Segmentation',
    description: 'Built a custom dataset with manual pixel-level masks and fine-tuned DeepLabV3-ResNet101. Evaluated with Pixel Accuracy, mIoU, Precision, and Recall.',
    tags: ['PyTorch', 'DeepLabV3', 'ResNet101'],
    link: 'https://github.com/akhil442/Semantic-Segmentation-using-DeepLabV3-ResNet101',
    github: 'https://github.com/akhil442/Semantic-Segmentation-using-DeepLabV3-ResNet101'
  },
  {
    id: '07',
    title: 'Coffee Sales Performance Dashboard',
    description: 'Built a fully interactive self-service sales dashboard in Excel by joining Orders, Customers, and Products tables using XLOOKUP and INDEX MATCH. Structured data as Excel Tables for auto-expansion, applied data cleaning, and layered pivot charts with slicers and timeline filters — all connected to a shared pivot cache so every filter updates every visual in sync.',
    tags: ['Excel', 'XLOOKUP', 'INDEX MATCH', 'Pivot Tables', 'Data Cleaning', 'Dashboard'],
    link: 'https://github.com/akhil442/coffee-sales-dashboard-advance-Excel-',
    github: 'https://github.com/akhil442/coffee-sales-dashboard-advance-Excel-'
  }
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#121212] py-32 px-8 md:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm tracking-[0.2em] text-gray-500 uppercase mb-12 font-mono">Selected Work // 2024</h2>
        
        <div className="flex flex-col border-t border-white/10">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              className="group relative border-b border-white/10 py-8 md:py-12 cursor-pointer transition-colors duration-500 hover:bg-white/[0.02] px-4 -mx-4"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="text-gray-600 font-mono text-sm md:text-base hidden md:block">{project.id}</span>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-gray-400 group-hover:text-white transition-colors duration-500 text-balance">
                    {project.title}
                  </h3>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex shrink-0">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all">
                    <ArrowUpRight size={24} />
                  </a>
                </div>
              </div>

              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 md:pl-[7.5rem] grid grid-cols-1 md:grid-cols-2 gap-8">
                      <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-col gap-6 md:items-end">
                        <div className="flex flex-wrap gap-2 md:justify-end">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-4 py-2 text-xs font-mono text-gray-300 bg-white/5 rounded-full border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                            <Code size={16} /> Source Code
                          </a>
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="md:hidden flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                            <ExternalLink size={16} /> Live View
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
