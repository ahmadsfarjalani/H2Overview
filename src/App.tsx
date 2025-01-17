import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageIndex from './components/PageIndex';
import PageProtokoll from './components/PageProtokoll';
import PageEintrag from './components/PageEintrag';
import PageAdmin from './components/PageAdmin';
import PagePrefs from './components/PagePrefs';
import NavScrollExample from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginContext, LoginInfo } from './components/LoginManager';
import { loginstatus } from './backend/api';
import ForbiddenAccess from './components/ForbiddenAccess';
import ProtokollErstellen from './components/ProtokollErstellen'; 
import EintragErstellen from './components/EintragErstellen';


function App() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo | false | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const loginFromServer = await loginstatus();

      setLoginInfo(loginFromServer);
    })();
  }, []);

  const isAdmin = loginInfo && loginInfo.admin;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
          <NavScrollExample />
          <Routes>
            <Route path="/" element={<PageIndex />} />
            <Route path="/protokoll/neu" element={<ProtokollErstellen />} />
            <Route path="/protokoll/:protokollId" element={<PageProtokoll />} />
            <Route path="/protokoll/:protokollId/eintrag/neu" element={<EintragErstellen />} />
            <Route path="/eintrag/:eintragId" element={<PageEintrag />} />
            <Route path="/admin" element={isAdmin ? <PageAdmin /> : <ForbiddenAccess />} />
            <Route path="/prefs" element={isAdmin ? <PagePrefs /> : <ForbiddenAccess />} />
          </Routes>
      </LoginContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
