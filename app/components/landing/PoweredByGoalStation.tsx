export function PoweredByGoalStation() {
  return (
    <div
      className="footer-powered-by-goalstation"
      style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', gap: 12, textAlign: 'center'}}
    >
      <span style={{fontSize: 11, lineHeight: 1.4, letterSpacing: '0.12em', textTransform: 'uppercase'}}>
        Powered by
      </span>
      <img
        src="https://cdn.shopify.com/s/files/1/0942/1380/0238/files/GS-Goal-Station.png?v=1776243848"
        alt="Goal Station"
        width={702}
        height={59}
        loading="lazy"
        style={{display: 'block', width: 180, maxWidth: '100%', height: 'auto'}}
      />
    </div>
  );
}
