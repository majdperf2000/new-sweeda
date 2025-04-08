/**
 * Enhanced Animations Library - nhanced-animations.ts
 * نسخة مطورة من مكتبة للتحريك السلس والعالي الأداء
 * الإصدار 2.1.0
 * الرخصة: MIT
 */

interface AnimationOptions {
  duration?: number;
  easing?: string | ((t: number) => number);
  delay?: number;
  loop?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
  autoplay?: boolean;
  onStart?: (element: HTMLElement | SVGElement) => void;
  onUpdate?: (element: HTMLElement | SVGElement, progress: number) => void;
  onComplete?: (element: HTMLElement | SVGElement) => void;
}

interface PropertyAnimationValue {
  from: number;
  to: number;
  unit: string;
}

interface PropertyAnimationValues {
  [key: string]: PropertyAnimationValue;
}

interface EasingFunctions {
  [key: string]: (t: number) => number;
}

class Animation {
  protected element: HTMLElement | SVGElement;
  protected options: AnimationOptions;
  protected _startTime: number;
  protected _pausedTime: number;
  protected _isPlaying: boolean;
  protected _isPaused: boolean;
  protected _animationId: number | null;
  protected _progress: number;
  protected _reverse: boolean;

  constructor(element: HTMLElement | SVGElement, options: AnimationOptions) {
    this.element = element;
    this.options = Object.assign(
      {
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 0,
        loop: false,
        direction: 'normal',
        autoplay: false,
        onStart: null,
        onUpdate: null,
        onComplete: null,
      },
      options
    );

    this._startTime = 0;
    this._pausedTime = 0;
    this._isPlaying = false;
    this._isPaused = false;
    this._animationId = null;
    this._progress = 0;
    this._reverse = false;

    if (this.options.autoplay) {
      this.play();
    }
  }

  play(): void {
    if (this._isPlaying) return;

    if (this._isPaused) {
      this._isPaused = false;
      this._startTime = performance.now() - this._pausedTime;
    } else {
      this._startTime = performance.now() + (this.options.delay || 0);
    }

    this._isPlaying = true;
    this._pausedTime = 0;

    if (typeof this.options.onStart === 'function') {
      this.options.onStart(this.element);
    }

    this._animate();
  }

  pause(): void {
    if (!this._isPlaying || this._isPaused) return;

    this._isPlaying = false;
    this._isPaused = true;
    this._pausedTime = performance.now() - this._startTime;

    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
  }

  stop(): void {
    this._isPlaying = false;
    this._isPaused = false;
    this._progress = 0;
    this._pausedTime = 0;

    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }

    this._updateElement(0);
  }

  reverse(): void {
    this._reverse = !this._reverse;
    this._pausedTime = (this.options.duration || 1000) - this._pausedTime;
    this._startTime = performance.now() - this._pausedTime;
  }

  protected _animate(): void {
    if (!this._isPlaying) return;

    const now = performance.now();
    const elapsed = now - this._startTime;
    const duration = this.options.duration || 1000;

    if (elapsed < 0) {
      this._animationId = requestAnimationFrame(() => this._animate());
      return;
    }

    let progress = Math.min(elapsed / duration, 1);

    if (this._reverse) {
      progress = 1 - progress;
    }

    this._progress = progress;

    const easingFunc = this._getEasingFunction();
    const easedProgress = easingFunc(progress);
    this._updateElement(easedProgress);

    if (typeof this.options.onUpdate === 'function') {
      this.options.onUpdate(this.element, easedProgress);
    }

    if (progress < 1 || (this._reverse && progress > 0)) {
      this._animationId = requestAnimationFrame(() => this._animate());
    } else {
      if (this.options.loop) {
        if (this.options.direction === 'alternate') {
          this.reverse();
        }
        this._startTime = performance.now();
        this._animationId = requestAnimationFrame(() => this._animate());
      } else {
        this._isPlaying = false;
        if (typeof this.options.onComplete === 'function') {
          this.options.onComplete(this.element);
        }
      }
    }
  }

  protected _getEasingFunction(): (t: number) => number {
    if (typeof this.options.easing === 'function') {
      return this.options.easing;
    }

    const easingName = this.options.easing || 'easeOutQuad';
    return easingFunctions[easingName] || easingFunctions['easeOutQuad'];
  }

  protected _updateElement(progress: number): void {
    throw new Error('Method _updateElement must be implemented in subclasses');
  }
}

class PropertyAnimation extends Animation {
  private properties: PropertyAnimationValues;

  constructor(element: HTMLElement, properties: Record<string, any>, options: AnimationOptions) {
    super(element, options);
    this.properties = this._parseProperties(properties);
  }

  private _parseProperties(properties: Record<string, any>): PropertyAnimationValues {
    const result: PropertyAnimationValues = {};

    for (const [prop, value] of Object.entries(properties)) {
      if (typeof value === 'object' && value.from !== undefined && value.to !== undefined) {
        result[prop] = {
          from: parseFloat(value.from),
          to: parseFloat(value.to),
          unit: value.unit || '',
        };
      } else if (typeof value === 'string' && value.includes('->')) {
        const [from, to] = value.split('->').map((v) => v.trim());
        const unitMatch = from.match(/[a-z%]+$/i) || to.match(/[a-z%]+$/i);
        const unit = unitMatch ? unitMatch[0] : '';

        result[prop] = {
          from: parseFloat(from.replace(unit, '')),
          to: parseFloat(to.replace(unit, '')),
          unit,
        };
      } else {
        console.warn(`Invalid property value for ${prop}:`, value);
      }
    }

    return result;
  }

  protected _updateElement(progress: number): void {
    for (const [prop, value] of Object.entries(this.properties)) {
      const currentValue = value.from + (value.to - value.from) * progress;
      (this.element as HTMLElement).style[prop as any] = `${currentValue}${value.unit}`;
    }
  }
}

class PathAnimation extends Animation {
  private pathLength: number;

  constructor(element: SVGPathElement, options: AnimationOptions) {
    super(element, options);
    this.pathLength = this._getPathLength();
  }

  private _getPathLength(): number {
    return this.element.getTotalLength?.() || 0;
  }

  protected _updateElement(progress: number): void {
    if (this.element.getPointAtLength) {
      const point = this.element.getPointAtLength(this.pathLength * progress);
      (this.element as SVGPathElement).style.transform = `translate(${point.x}px, ${point.y}px)`;
    }
  }
}

class WaveAnimation extends Animation {
  private originalHTML: string;
  private chars: HTMLElement[];

  constructor(element: HTMLElement, options: AnimationOptions) {
    super(element, options);
    this.originalHTML = element.innerHTML;
    this.chars = this._splitText();
  }

  private _splitText(): HTMLElement[] {
    const text = this.element.textContent || '';
    this.element.innerHTML = '';

    return Array.from(text).map((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.position = 'relative';
      this.element.appendChild(span);
      return span;
    });
  }

  protected _updateElement(progress: number): void {
    this.chars.forEach((char, i) => {
      const delay = i * 0.05;
      const charProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
      const y = Math.sin(charProgress * Math.PI * 2) * 10;
      char.style.transform = `translateY(${y}px)`;
    });
  }
}

const easingFunctions: EasingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInElastic: (t: number) => (0.04 - 0.04 / t) * Math.sin(25 * t) + 1,
  easeOutElastic: (t: number) => ((0.04 * t) / --t) * Math.sin(25 * t),
  easeInOutElastic: (t: number) =>
    (t -= 0.5) < 0
      ? (0.02 + 0.01 / t) * Math.sin(50 * t)
      : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1,
  easeInBounce: (t: number) => 1 - easingFunctions.easeOutBounce(1 - t),
  easeOutBounce: (t: number) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
};

const elementCache = new WeakMap<HTMLElement | SVGElement, Animation>();

const NhancedAnimations = {
  version: '2.1.0',

  animateProperties(
    element: HTMLElement,
    properties: Record<string, any>,
    options: AnimationOptions
  ): PropertyAnimation {
    const animation = new PropertyAnimation(element, properties, options);
    elementCache.set(element, animation);
    return animation;
  },

  animatePath(element: SVGPathElement, options: AnimationOptions): PathAnimation {
    const animation = new PathAnimation(element, options);
    elementCache.set(element, animation);
    return animation;
  },

  animateWave(element: HTMLElement, options: AnimationOptions): WaveAnimation {
    const animation = new WaveAnimation(element, options);
    elementCache.set(element, animation);
    return animation;
  },

  getAnimation(element: HTMLElement | SVGElement): Animation | undefined {
    return elementCache.get(element);
  },

  stopAll(): void {
    // WeakMap لا يمكن مسح محتواها مباشرة، لذا نتركها للجمع القمامة
    // العناصر ستزال تلقائياً عند إزالة العناصر من DOM
  },

  addEasingFunction(name: string, func: (t: number) => number): void {
    if (typeof func === 'function') {
      easingFunctions[name] = func;
    } else {
      console.warn(`Easing function ${name} must be a valid function`);
    }
  },

  getEasingFunctions(): string[] {
    return Object.keys(easingFunctions);
  },
};

export default NhancedAnimations;
