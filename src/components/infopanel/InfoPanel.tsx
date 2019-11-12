import React from 'react';
import { Sykmelding, Arbeidsgiver } from '../../types/sykmeldingTypes';
import { Sidetittel } from 'nav-frontend-typografi';
import EkspanderbartpanelWrapper from './components/ekspanderbartpanelwrapper/EkspanderbartpanelWrapper';
import PanelRad from './components/PanelRad';
import PanelSeksjon from './components/PanelSeksjon';
import SykmeldingPerioder from './components/periode/SykmeldingPerioder';
import DiagnoseSeksjon from './components/diagnose/DiagnoseSeksjon';
import LegeSeksjon from './components/lege/LegeSeksjon';
import ArbeidsgiverSeksjon from './components/arbeidsgiver/ArbeidsgiverSeksjon';
import PrognoseSeksjon from './components/prognose/PrognoseSeksjon';
import FraverSeksjon from './components/fraver/FraverSeksjon';

import './infopanel.less';

interface InfoPanelProps {
    sykmelding: Sykmelding;
}

const InfoPanel = ({ sykmelding }: InfoPanelProps) => {
    console.log(sykmelding);

    return (
        <article className="panel">
            <header className="panel-header">ikon navn</header>
            <div className="panel-content">
                <Sidetittel className="panel-content-header">Sykmelding</Sidetittel>

                <SykmeldingPerioder perioder={sykmelding.perioder} />

                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}

                <FraverSeksjon fraver={sykmelding.medisinskVurdering.annenFraversArsak} />

                <p>spm med checkbox</p>
                <PanelRad>
                    <PanelSeksjon tittel="Skadedato" verdi="asd" />
                </PanelRad>
                <p>spm med checkbox</p>

                <PrognoseSeksjon prognose={sykmelding.prognose} />

                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />

                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <EkspanderbartpanelWrapper />
            </div>
        </article>
    );
};

export default InfoPanel;
