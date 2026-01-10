import { Brush, PaintBucket, Eraser, Undo, Download } from 'lucide-react';

interface ControlsProps {
    tool: 'brush' | 'bucket' | 'eraser';
    setTool: (t: 'brush' | 'bucket' | 'eraser') => void;
    color: string;
    setColor: (c: string) => void;
    brushSize: number;
    setBrushSize: (s: number) => void;
    onUndo: () => void;
    onSave: () => void;
}

const COLORS = [
    '#E53935', // Red (primary)
    '#FDD835', // Yellow (primary)
    '#1E88E5', // Blue (primary)
    '#FB8C00', // Orange (secondary)
    '#43A047', // Green (secondary)
    '#8E24AA', // Purple (secondary)
    '#6D4C41', // Brown
    '#757575', // Grey
    '#000000', // Black
    '#FFFFFF', // White
];

export function Controls({ tool, setTool, color, setColor, brushSize, setBrushSize, onUndo, onSave }: ControlsProps) {
    return (
        <div className="controls-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--panel-bg)',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow)',
            width: '240px',
            overflowY: 'auto'
        }}>

            {/* Tools */}
            <div className="controls-tools" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button
                    onClick={() => setTool('brush')}
                    style={{
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: tool === 'brush' ? 'var(--primary)' : '#f0f0f0',
                        color: tool === 'brush' ? 'white' : '#555',
                        transition: 'all 0.2s'
                    }}
                    title="Brush"
                >
                    <Brush size={24} />
                </button>
                <button
                    onClick={() => setTool('bucket')}
                    style={{
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: tool === 'bucket' ? 'var(--primary)' : '#f0f0f0',
                        color: tool === 'bucket' ? 'white' : '#555',
                        transition: 'all 0.2s'
                    }}
                    title="Fill Bucket"
                >
                    <PaintBucket size={24} />
                </button>
                <button
                    onClick={() => setTool('eraser')}
                    style={{
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: tool === 'eraser' ? 'var(--primary)' : '#f0f0f0',
                        color: tool === 'eraser' ? 'white' : '#555',
                        transition: 'all 0.2s'
                    }}
                    title="Eraser"
                >
                    <Eraser size={24} />
                </button>
            </div>

            {/* Brush Size */}
            {(tool === 'brush' || tool === 'eraser') && (
                <div className="controls-size" style={{ padding: '0 0.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                        Size
                    </label>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                    />
                </div>
            )}

            {/* Colors */}
            <div className="controls-colors" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {COLORS.map(c => (
                    <button
                        key={c}
                        onClick={() => {
                            setColor(c);
                            if (tool === 'eraser') setTool('brush'); // Auto switch back to brush
                        }}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: c,
                            border: c === color && tool !== 'eraser' ? '4px solid #ddd' : (c === '#FFFFFF' ? '2px solid #ccc' : '2px solid transparent'),
                            cursor: 'pointer',
                            boxShadow: c === color && tool !== 'eraser' ? '0 0 0 2px var(--primary)' : 'none',
                            transition: 'transform 0.1s'
                        }}
                    />
                ))}
            </div>

            {/* Actions */}
            <div className="controls-actions" style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={onUndo}
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: '#FFD93D',
                        color: '#555',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <Undo size={20} /> Undo
                </button>
                <button
                    onClick={onSave}
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: '#6BCB77',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <Download size={20} /> Save
                </button>
            </div>

        </div>
    );
}
