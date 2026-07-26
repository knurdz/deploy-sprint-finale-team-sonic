import { emailStatus } from "../config/emailStatus";

export default function EmailStatus() {
  return (
    <section className="panel">
      <h2>Email Alerts</h2>

      <p>
        Provider: <strong>{emailStatus.provider}</strong>
      </p>

      <p>
        Configured:{" "}
        <strong>
          {emailStatus.configured ? "Yes" : "No"}
        </strong>
      </p>

      <p>
        Secret Redacted:{" "}
        <strong>
          {emailStatus.secretRedacted ? "Yes" : "No"}
        </strong>
      </p>
    </section>
  );
}