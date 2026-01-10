import { useState } from 'react';
import { Wand2 } from 'lucide-react';

interface GeneratorProps {
    onGenerate: (topic: string, complexity: string) => void;
    isLoading: boolean;
}

const PRESETS = [
    { label: 'Dinosaur', icon: '🦕' },
    { label: 'Unicorn', icon: '🦄' },
    { label: 'Robot', icon: '🤖' },
    { label: 'Butterfly', icon: '🦋' },
    { label: 'Car', icon: '🚗' },
    { label: 'Flower', icon: '🌸' },
    { label: 'Spaceship', icon: '🚀' },
    { label: 'Castle', icon: '🏰' },
    { label: 'Dragon', icon: '🐉' },
    { label: 'Cat', icon: '🐱' }
];

export function Generator({ onGenerate, isLoading }: GeneratorProps) {
    const [topic, setTopic] = useState('');

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        // Simple coloring pages for kids
        onGenerate(topic, 'simple');
    };

    const isCustom = topic.trim() && !PRESETS.some(p => p.label === topic);

    return (
        <div className="generator-container" style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            padding: '0.5rem',
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
            flexWrap: 'wrap'
        }}>
            <div className="generator-input" style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '200px', flexDirection: 'column', alignItems: 'flex-start' }}>
                <input
                    type="text"
                    placeholder="Pick a character below or type one!"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '2px solid #ddd',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />

                {isCustom && (
                    <div style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        fontStyle: 'italic',
                        paddingLeft: '4px',
                        animation: 'fadeIn 0.3s ease-in-out'
                    }}>
                        ✨ Custom images take about 10 seconds to generate
                    </div>
                )}

                <div className="generator-presets" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {PRESETS.map(item => (
                        <button
                            key={item.label}
                            onClick={() => setTopic(item.label)}
                            title={item.label}
                            style={{
                                padding: '8px',
                                fontSize: '1.5rem',
                                backgroundColor: topic === item.label ? '#d4edda' : '#f0f0f0',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                border: topic === item.label ? '2px solid #28a745' : '1px solid #ddd',
                                minWidth: '44px',
                                minHeight: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {item.icon}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                    onClick={handleGenerate}
                    disabled={!topic.trim() || isLoading}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '8px',
                        backgroundColor: isLoading ? '#ccc' : 'var(--secondary)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: isLoading ? 'none' : '0 4px 0 #3db1a9',
                        transform: isLoading ? 'translateY(4px)' : 'none',
                        transition: 'all 0.1s'
                    }}
                >
                    <Wand2 size={20} />
                    {isLoading ? 'Creating...' : 'Create!'}
                </button>
            </div>
        </div>
    );
}
