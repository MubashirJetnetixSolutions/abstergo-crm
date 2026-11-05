"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { LeadItem } from "./LeadsPipelineTable";

interface KanbanCardItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  technician: string;
  timeAgo: string;
  priority: "High" | "Medium" | "Low";
}

interface ColumnConfig {
  id: string;
  title: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  items: KanbanCardItem[];
}

const DEFAULT_COLUMNS: ColumnConfig[] = [
  {
    id: "contacted",
    title: "Contacted",
    accentColor: "bg-[#EDAC00]",
    badgeBg: "bg-[#FFF8E6]",
    badgeText: "text-[#EDAC00]",
    badgeBorder: "border-[#FDE68A]",
    items: [
      {
        id: "c1",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Medium",
      },
      {
        id: "c2",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "High",
      },
      {
        id: "c3",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Low",
      },
      {
        id: "c4",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Medium",
      },
      {
        id: "c5",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Low",
      },
      {
        id: "c6",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "High",
      },
    ],
  },
  {
    id: "qualified",
    title: "Qualified",
    accentColor: "bg-[#8A58FF]",
    badgeBg: "bg-[#F3E8FF]",
    badgeText: "text-[#8A58FF]",
    badgeBorder: "border-[#DDD6FE]",
    items: [
      {
        id: "q1",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Low",
      },
      {
        id: "q2",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "High",
      },
      {
        id: "q3",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Medium",
      },
      {
        id: "q4",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Low",
      },
      {
        id: "q5",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "High",
      },
    ],
  },
  {
    id: "follow-up",
    title: "Follow-up",
    accentColor: "bg-[#FF611C]",
    badgeBg: "bg-[#FFF0EB]",
    badgeText: "text-[#FF611C]",
    badgeBorder: "border-[#FFD8CC]",
    items: [
      {
        id: "f1",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Low",
      },
      {
        id: "f2",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Medium",
      },
      {
        id: "f3",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "High",
      },
      {
        id: "f4",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Medium",
      },
      {
        id: "f5",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Low",
      },
    ],
  },
  {
    id: "converted",
    title: "Converted",
    accentColor: "bg-[#009689]",
    badgeBg: "bg-[#E5F4F3]",
    badgeText: "text-[#009689]",
    badgeBorder: "border-[#99F6E4]",
    items: [
      {
        id: "cv1",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "High",
      },
      {
        id: "cv2",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Medium",
      },
      {
        id: "cv3",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Low",
      },
      {
        id: "cv4",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "High",
      },
      {
        id: "cv5",
        name: "Abena Osei-Bonsu",
        company: "GreenTech Solutions",
        email: "fatima@northernfarms.gh",
        phone: "+233 37 200 1144",
        technician: "Marcus Johnson",
        timeAgo: "2hrs ago",
        priority: "Low",
      },
    ],
  },
];

interface LeadsKanbanBoardProps {
  leads?: LeadItem[];
  selectedStage?: string;
  selectedPriority?: string;
  selectedTechnician?: string;
}

export default function LeadsKanbanBoard({
  selectedStage = "All Stages",
  selectedPriority = "All Priorities",
  selectedTechnician = "All Technicians",
}: LeadsKanbanBoardProps) {
  const router = useRouter();

  // Kanban Columns State
  const [columns, setColumns] = useState<ColumnConfig[]>(DEFAULT_COLUMNS);

  // Drag & Drop States
  const [draggedInfo, setDraggedInfo] = useState<{
    cardId: string;
    colId: string;
  } | null>(null);
  const [dragOverColId, setDragOverColId] = useState<string | null>(null);
  const [dragOverCardId, setDragOverCardId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<"before" | "after" | null>(null);

  const isDraggingRef = useRef(false);

  const getPriorityBadge = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#FEE9E9] text-[#F92424] border border-[#F92424]">
            • High
          </span>
        );
      case "Medium":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#FFF8E6] text-[#EDAC00] border border-[#EDAC00]">
            • Medium
          </span>
        );
      case "Low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#E5F4F3] text-[#009689] border border-[#009689]">
            • Low
          </span>
        );
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, cardId: string, colId: string) => {
    isDraggingRef.current = true;
    setDraggedInfo({ cardId, colId });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", cardId);
  };

  const handleDragEnd = () => {
    setDraggedInfo(null);
    setDragOverColId(null);
    setDragOverCardId(null);
    setDropPosition(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 150);
  };

  const handleCardDragOver = (
    e: React.DragEvent,
    cardId: string,
    colId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedInfo || draggedInfo.cardId === cardId) return;

    setDragOverColId(colId);
    setDragOverCardId(cardId);

    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    if (e.clientY < midY) {
      setDropPosition("before");
    } else {
      setDropPosition("after");
    }
  };

  const handleColumnDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    if (!draggedInfo) return;
    setDragOverColId(colId);
    if (!dragOverCardId) {
      setDropPosition(null);
    }
  };

  const handleColumnDragLeave = (e: React.DragEvent, colId: string) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    if (dragOverColId === colId) {
      setDragOverColId(null);
      setDragOverCardId(null);
      setDropPosition(null);
    }
  };

  const handleDropOnColumn = (targetColId: string) => {
    if (!draggedInfo) return;
    moveCard(draggedInfo.cardId, draggedInfo.colId, targetColId);
  };

  const handleDropOnCard = (
    e: React.DragEvent,
    targetCardId: string,
    targetColId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedInfo) return;
    moveCard(
      draggedInfo.cardId,
      draggedInfo.colId,
      targetColId,
      targetCardId,
      dropPosition || "after"
    );
  };

  const moveCard = (
    cardId: string,
    sourceColId: string,
    targetColId: string,
    targetCardId?: string,
    position: "before" | "after" = "after"
  ) => {
    setColumns((prev) => {
      const srcCol = prev.find((c) => c.id === sourceColId);
      if (!srcCol) return prev;
      const card = srcCol.items.find((i) => i.id === cardId);
      if (!card) return prev;

      // Remove from source
      const next = prev.map((col) => {
        if (col.id === sourceColId) {
          return {
            ...col,
            items: col.items.filter((i) => i.id !== cardId),
          };
        }
        return col;
      });

      // Insert into target column
      const targetColIdx = next.findIndex((c) => c.id === targetColId);
      if (targetColIdx === -1) return prev;

      const targetCol = next[targetColIdx];
      let newItems = [...targetCol.items];

      if (targetCardId && targetCardId !== cardId) {
        const targetIdx = newItems.findIndex((i) => i.id === targetCardId);
        if (targetIdx !== -1) {
          const insertIdx = position === "before" ? targetIdx : targetIdx + 1;
          newItems.splice(insertIdx, 0, card);
        } else {
          newItems.push(card);
        }
      } else {
        newItems.push(card);
      }

      next[targetColIdx] = {
        ...targetCol,
        items: newItems,
      };

      return next;
    });

    handleDragEnd();
  };

  const handleCardClick = (cardId: string) => {
    if (isDraggingRef.current) return;
    router.push("/leads/LD-1029");
  };

  // Filtering
  const filteredColumns = columns
    .map((col) => {
      let items = col.items;
      if (selectedPriority !== "All Priorities") {
        const match = selectedPriority.replace(" Priority", "");
        items = items.filter((item) => item.priority === match);
      }
      if (selectedTechnician !== "All Technicians") {
        items = items.filter((item) => item.technician === selectedTechnician);
      }
      return {
        ...col,
        items,
      };
    })
    .filter((col) => {
      if (selectedStage === "All Stages") return true;
      return col.title.toLowerCase().includes(selectedStage.toLowerCase());
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full items-start select-none">
      {filteredColumns.map((col) => {
        const isColumnActiveTarget =
          dragOverColId === col.id && draggedInfo?.colId !== col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleColumnDragOver(e, col.id)}
            onDragLeave={(e) => handleColumnDragLeave(e, col.id)}
            onDrop={() => handleDropOnColumn(col.id)}
            className={`border rounded-[10px] p-3 flex flex-col gap-3 min-h-[520px] transition-all duration-150 ${
              isColumnActiveTarget
                ? "bg-[#FFF6F2] border-[#FF611C]/60 shadow-sm"
                : "bg-[#F8FAFD] border-[#EDEDED]"
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-1 py-1">
              <div className="flex items-center gap-2">
                <span className={`w-[3.5px] h-4 rounded-full ${col.accentColor}`} />
                <h3 className="font-medium text-[#3D3D49] text-[14px]">
                  {col.title}
                </h3>
              </div>
              <span
                className={`px-2 py-0.5 rounded-[4px] border text-xs font-medium transition-colors ${col.badgeBg} ${col.badgeText} ${col.badgeBorder}`}
              >
                {col.items.length}
              </span>
            </div>

            {/* Cards List */}
            <div className="flex flex-col gap-3 flex-1">
              {col.items.map((card) => {
                const isCardDragged = draggedInfo?.cardId === card.id;
                const isCardTarget = dragOverCardId === card.id;

                return (
                  <div key={card.id} className="relative flex flex-col">
                    {/* Top Drop Indicator Line */}
                    {isCardTarget && dropPosition === "before" && (
                      <div className="h-1 bg-[#FF611C] rounded-full mx-1 mb-1.5 shadow-sm animate-pulse" />
                    )}

                    {/* Draggable Card */}
                    <div
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, card.id, col.id)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleCardDragOver(e, card.id, col.id)}
                      onDrop={(e) => handleDropOnCard(e, card.id, col.id)}
                      onClick={() => handleCardClick(card.id)}
                      className={`border rounded-[10px] p-4 flex flex-col gap-3 transition-all cursor-grab active:cursor-grabbing group ${
                        isCardDragged
                          ? "opacity-35 border-dashed border-[#FF611C] bg-[#FFF8F5] scale-[0.98]"
                          : "bg-white border-[#EDEDED] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#D0D0D0]"
                      }`}
                    >
                      {/* Top Row: Name + Company & Priority */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col min-w-0">
                          <h4 className="font-medium text-[#3D3D49] text-[14px] leading-tight truncate group-hover:text-[#FF611C] transition-colors">
                            {card.name}
                          </h4>
                          <span className="text-[12px] text-[#575765] font-normal leading-tight mt-1 truncate">
                            {card.company}
                          </span>
                        </div>
                        <div className="shrink-0">
                          {getPriorityBadge(card.priority)}
                        </div>
                      </div>

                      {/* Middle Row: Email & Phone */}
                      <div className="flex flex-col gap-1 text-[12px] text-[#575765] font-normal">
                        <span className="truncate">{card.email}</span>
                        <span>{card.phone}</span>
                      </div>

                      {/* Bottom Row: Technician & Time */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#F3F4F6] text-[12px]">
                        <span className="font-medium text-[#3D3D49]">
                          {card.technician}
                        </span>
                        <span className="text-[11px] text-[#8C8C9A]">
                          {card.timeAgo}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Drop Indicator Line */}
                    {isCardTarget && dropPosition === "after" && (
                      <div className="h-1 bg-[#FF611C] rounded-full mx-1 mt-1.5 shadow-sm animate-pulse" />
                    )}
                  </div>
                );
              })}

              {/* Empty Column Drop Placeholder */}
              {col.items.length === 0 && (
                <div
                  onDragOver={(e) => handleColumnDragOver(e, col.id)}
                  onDrop={() => handleDropOnColumn(col.id)}
                  className="flex-1 min-h-[140px] border-2 border-dashed border-[#EDEDED] rounded-[10px] flex items-center justify-center text-xs text-[#8C8C9A] p-4 text-center"
                >
                  Drop leads here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
