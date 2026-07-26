import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface FeatureFlagManifest {
  task: string;
  feature: string;
  enabled: boolean;
  configured: boolean;
  valueRedacted: boolean;
  source: string;
}

export function FeatureInsights() {
  const [flag, setFlag] = useState<FeatureFlagManifest | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadFeatureFlag() {
      try {
        const response = await fetch('/runtime/feature-flags.json', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Feature flag request failed: ${response.status}`);
        }

        const data: FeatureFlagManifest = await response.json();
        setFlag(data);
      } catch (requestError) {
        console.error('Unable to load feature flag manifest:', requestError);
        setError(true);
      }
    }

    loadFeatureFlag();
  }, []);

  if (error || !flag) {
    return null;
  }

  if (!flag.enabled) {
    return (
      <section className="featureFlagStatus" aria-label="Feature flag status">
        <strong>Insights feature:</strong>
        <span>Disabled</span>
        <span>Value redacted: {flag.valueRedacted ? 'yes' : 'no'}</span>
      </section>
    );
  }

  return (
    <section className="insightsPanel" aria-label="Learning insights">
      <div className="insightsIcon" aria-hidden="true">
        <Activity size={24} />
      </div>

      <div>
        <p className="eyebrow">Runtime feature</p>
        <h2>Learning insights are enabled</h2>
        <p>
          Additional progress insights are available because the runtime
          feature flag is enabled.
        </p>
      </div>
    </section>
  );
}