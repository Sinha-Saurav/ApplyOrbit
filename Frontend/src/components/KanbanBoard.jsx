import React from "react";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";

const COLUMNS = ["Applied", "Shortlisted", "Interview", "Offer", "Rejected"];

const COLUMN_COLORS = {
    Applied: { bg: "#eff6ff", text: "#2563eb", dot: "#3b82f6" },
    Shortlisted: { bg: "#fefce8", text: "#854d0e", dot: "#eab308" },
    Interview: { bg: "#f0fdf4", text: "#166534", dot: "#22c55e" },
    Offer: { bg: "#f0fdf4", text: "#14532d", dot: "#16a34a" },
    Rejected: { bg: "#fef2f2", text: "#991b1b", dot: "#ef4444" },
};



//Application Card
function KanbanCard({ app, isDragging }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: app.id });

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.4 : 1,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "12px 14px",
        cursor: "grab",
        userSelect: "none",
        marginBottom: 8,
    }

    const col = COLUMN_COLORS[app.status];

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className="font-semibold text-[14px] text-[#111] mb-0.5">
                {app.company}
            </div>
            <div className="mb-2 text-[12px] text-[#6b7280]">{app.role}</div>
            <div className="flex justify-between items-center">
                <span
                    className="text-[11px] font-medium py-0.5 px-2 rounded-[20px]"
                    style={{ backgroundColor: col.bg, color: col.text }}
                >
                    {app.status}
                </span>
                <span className="text-[11px] text-[#9ca3af]">{app.date}</span>
            </div>
        </div>
    )
}


//Column
function KanbanColumn({ id, cards, activeId }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const col = COLUMN_COLORS[id];

    return (
        <div className="flex-1 min-w-[200px]">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3" >
                <span className="w-2 h-2 rounded-[50%] shrink-[0]"
                    style={{
                        background: col.dot
                    }} />
                <span className="font-semibold text-[13px] text-[#374151]">{id}</span>
                <span className="ml-auto text-[11px] font-semibold bg-[#f3f4f6] 
                    text-[#6b7280] px-[7px] py-[1px] rounded-[20px]"
                >
                    {cards.length}
                </span>
            </div>

            {/* Drop Zone */}
            <div
                ref={setNodeRef}
                className={`rounded-xl p-2.5 min-h-[300px] max-h-[550px] overflow-y-auto kanban-scroll transition-colors 
                    duration-150 ${isOver ? "bg-sky-50 border-[1.5px] border-dashed border-blue-300" : "bg-gray-50 border-[1.5px] border-dashed border-gray-200"
                    }`}

            >
                {cards.map((app) => (
                    <KanbanCard key={app.id} app={app} isDragging={activeId === app.id} />
                ))}
                {cards.length === 0 && (
                    <div className="text-center text-[#d1d5db] text-[12px] pt-18">
                        Drop here
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── Drag Overlay Card (ghost while dragging) ─────────────────
function OverlayCard({ app }) {
    const col = COLUMN_COLORS[app.status];
    return (
        <div className="bg-[#fff] border-[1px] border-[#d1d5db] rounded-[10px] 
        px-[14px] py-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-[200px] cursor-grabbing"
        >
            <div className="font-semibold text-[14px] text-[#111] mb-0.5">{app.company}</div>
            <div className="text-[12px] text-[#6b7280] mb-2">{app.role}</div>
            <span style={{
                fontSize: 11, fontWeight: 500,
                background: col.bg, color: col.text,
                padding: "2px 8px", borderRadius: 20,
            }}>
                {app.status}
            </span>
        </div>
    );
}

//MainBoard
export default function KanbanBoard({apps, setApps}) {
    const [activeId, setActiveId] = React.useState(null);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 5 }, // prevents accidental drags on click
    }));

    const activeApp = apps.find((a) => a.id === activeId);

    const cardsByColumn = COLUMNS.reduce((acc, col) => {
        acc[col] = apps.filter((a) => a.status === col);
        return acc;
    }, {});

    function handleDragStart({ active }) {
        setActiveId(active.id);
    }

    function handleDragEnd({ active, over }) {
        setActiveId(null);
        if (!over) return;

        const cardId = active.id;
        const newStatus = over.id;

        setApps((prev) =>
            prev.map((app) =>
                app.id === cardId ? { ...app, status: newStatus } : app
            )
        );

        // ── API call to your backend ──────────────────────────────
        // fetch(`/api/applications/${cardId}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ status: newStatus }),
        // });
    }

    return (
        <div style={{ padding: "24px", fontFamily: "inherit" }}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
                    {COLUMNS.map((col) => (
                        <KanbanColumn
                            key={col}
                            id={col}
                            cards={cardsByColumn[col]}
                            activeId={activeId}
                        />
                    ))}
                </div>

                {/* Floating card that follows cursor while dragging */}
                <DragOverlay>
                    {activeApp ? <OverlayCard app={activeApp} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}