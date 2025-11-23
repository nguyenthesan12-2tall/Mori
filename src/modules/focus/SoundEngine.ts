export class SoundEngine {
    private context: AudioContext | null = null;
    private gainNode: GainNode | null = null;
    private source: AudioBufferSourceNode | null = null;
    private isPlaying: boolean = false;
    private currentType: 'rain' | 'white' | 'pink' | null = null;

    constructor() {
        // Initialize context lazily on first user interaction
    }

    private init() {
        if (!this.context) {
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.gainNode = this.context.createGain();
            this.gainNode.connect(this.context.destination);
        }
    }

    // Generate White Noise Buffer
    private createWhiteNoise(): AudioBuffer {
        const bufferSize = 2 * this.context!.sampleRate;
        const buffer = this.context!.createBuffer(1, bufferSize, this.context!.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    // Generate Brown Noise Buffer (Approximation for Rain)
    private createBrownNoise(): AudioBuffer {
        const bufferSize = 2 * this.context!.sampleRate;
        const buffer = this.context!.createBuffer(1, bufferSize, this.context!.sampleRate);
        const output = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // Compensate for gain loss
        }
        return buffer;
    }

    public play(type: 'rain' | 'white') {
        this.init();
        if (this.context?.state === 'suspended') {
            this.context.resume();
        }

        // If already playing this type, toggle off
        if (this.isPlaying && this.currentType === type) {
            this.stop();
            return;
        }

        // If playing another type, stop it first
        if (this.isPlaying) {
            this.stop();
        }

        const buffer = type === 'rain' ? this.createBrownNoise() : this.createWhiteNoise();

        this.source = this.context!.createBufferSource();
        this.source.buffer = buffer;
        this.source.loop = true;
        this.source.connect(this.gainNode!);

        // Fade in
        this.gainNode!.gain.setValueAtTime(0, this.context!.currentTime);
        this.gainNode!.gain.linearRampToValueAtTime(0.15, this.context!.currentTime + 2); // Low volume for ambient

        this.source.start();
        this.isPlaying = true;
        this.currentType = type;
    }

    public stop() {
        if (this.source && this.isPlaying) {
            // Fade out
            this.gainNode!.gain.linearRampToValueAtTime(0, this.context!.currentTime + 1);
            setTimeout(() => {
                this.source?.stop();
                this.source = null;
            }, 1000);
            this.isPlaying = false;
            this.currentType = null;
        }
    }

    public setVolume(value: number) {
        if (this.gainNode) {
            this.gainNode.gain.setValueAtTime(value, this.context!.currentTime);
        }
    }
}

export const soundEngine = new SoundEngine();
