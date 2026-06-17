import React from "react";
import { AppContext } from "../context/AppContext";
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
function KanbanCard({ app, isDragging, setDeleteConfirmId }) {
    const { setSelectedApp } = React.useContext(AppContext)
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: app.id });

    const col = COLUMN_COLORS[app.status];

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.4 : 1,
        background: "#fff",
        border: `1px solid ${col.text}`,
        borderRadius: 10,
        padding: "13px 14px",
        cursor: "grab",
        userSelect: "none",
        marginBottom: 8,
    }


    function handleClick() {
        setSelectedApp(app)
    }


    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className="flex justify-between">
                <div className="font-semibold text-[14px] text-[#111] mb-0.5">
                    {app.company.charAt(0).toUpperCase() + app.company.slice(1)}
                </div>
                <div className="flex gap-1">
                    <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-gray-400 p-1 rounded-md cursor-pointer transition-all duration-200 hover:text-green-700 hover:bg-[#c0edd5]"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>

                    <svg onClick={()=>setDeleteConfirmId(app.id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        className="text-gray-400 p-1 rounded-md cursor-pointer transition-all duration-200 hover:text-[#e76f51] hover:bg-orange-100"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                </div>
            </div>
            <div className="mb-5 text-[12px] text-[#6b7280]">{app.role}</div>
            <div className="flex justify-between items-center">
                <span
                    className="text-[11px] font-medium py-0.5 px-2 rounded-[10px]"
                    style={{
                        backgroundColor: col.bg,
                        color: col.text
                    }}
                >
                    {app.location || app.status}
                </span>
                <span className="text-[11px] ">{app.date_applied}</span>
            </div>
        </div>
    )
}


//Column
function KanbanColumn({ id, cards, activeId, setDeleteConfirmId }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const col = COLUMN_COLORS[id];

    return (
        <div className="flex-1 min-w-[230px]">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3 px-2" >
                <span className="w-2 h-2 rounded-[50%] shrink-[0]"
                    style={{
                        background: col.dot
                    }} />
                <span className="font-semibold text-[15px] text-[#374151]">{id}</span>
                <span className="ml-auto text-[11px] font-semibold
                     px-[7px] py-[1px] rounded-[20px]"
                    style={{
                        backgroundColor: col.bg,
                        color: col.text,
                        filter: "brightness(0.92)"
                    }}
                >
                    {cards.length}
                </span>
            </div>

            {/* Drop Zone */}
            <div
                ref={setNodeRef}
                className={`rounded-xl p-2.5 min-h-[500px] max-h-[600px] overflow-y-auto kanban-scroll transition-colors 
                    duration-150 border-[1.5px] border-dashed`}
                style={{
                    borderColor: isOver ? col.text : "#c4c4c4",
                    backgroundColor: isOver ? col.bg : "#f9fafb"
                }}

            >
                {cards.map((app) => (
                    <KanbanCard key={app.id} app={app} isDragging={activeId === app.id} setDeleteConfirmId={setDeleteConfirmId} />
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
            <div className="text-[12px] text-[#6b7280] mb-5">{app.role}</div>
            <span style={{
                fontSize: 11, fontWeight: 500,
                background: col.bg, color: col.text,
                padding: "2px 8px", borderRadius: 20,
            }}>
                {app.location || app.status}
            </span>
        </div>
    );
}

//MainBoard
export default function KanbanBoard({ apps: filterApps }) {
    const { app: contextApps, setApps, getToken,  deleteApp } = React.useContext(AppContext);
    const apps = filterApps || contextApps;

    const [activeId, setActiveId] = React.useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 5 },
    }));

    const activeApp = apps.find((a) => a.id === activeId);

    const cardsByColumn = COLUMNS.reduce((acc, col) => {
        acc[col] = apps.filter((a) => a.status === col);
        return acc;
    }, {});

    function handleDragStart({ active }) {
        setActiveId(active.id);
    }

    async function handleDragEnd({ active, over }) {
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
        try {
            const token = await getToken()
            const res = await fetch(`/api/applications/${cardId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) {
                setApps((prev) =>
                    prev.map((app) =>
                        app.id = cardId ? { ...app, status: active.data.current?.status } : app
                    )
                );
            }

        } catch (err) {
            console.error("Failed to update status:", err.message);
        }
    }

    return (
        <>
            {deleteConfirmId && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[500px] shadow-xl flex items-center flex-col">
                        <div className="w-14 h-14 rounded-full bg-orange-300 flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                        </div>
                        <h3 className="text-2xl text-center mb-6 font-semibold text-gray-800 mb-2">Delete Application</h3>
                        <p className="text-sm text-gray-500 mb-6 text-center">
                            Are you sure you want to delete this application? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    await deleteApp(deleteConfirmId);
                                    setDeleteConfirmId(null);
                                }}
                                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div style={{ padding: "24px", fontFamily: "inherit" }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div style={{ display: "flex", width: "100%", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
                        {COLUMNS.map((col) => (
                            <KanbanColumn
                                key={col}
                                id={col}
                                cards={cardsByColumn[col]}
                                activeId={activeId}
                                setDeleteConfirmId={setDeleteConfirmId}
                            />
                        ))}
                    </div>

                    {/* Floating card that follows cursor while dragging */}
                    <DragOverlay>
                        {activeApp ? <OverlayCard app={activeApp} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </>
    );
}