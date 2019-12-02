import React, { useRef, useEffect } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Tittel from '../../infopanel/layout/Tittel';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import tekster from './nysykmelding-tekster';
import Sidetopp from '../../sidetopp/Sidetopp';
import InfoPanel from '../../infopanel/InfoPanel';
import Veileder from '../../veileder/Veileder';
import EldreSykmeldingVarsel from './components/EldreSykmeldingVarsel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import FraverSeksjon from '../../infopanel/panelelementer/FraverSeksjon';
import SvangerskapSeksjon from '../../infopanel/panelelementer/SvangerskapSeksjon';
import SkadeSeksjon from '../../infopanel/panelelementer/SkadeSeksjon';
import ArbeidsuforSeksjon from '../../infopanel/panelelementer/ArbeidsuforSeksjon';
import PrognoseSeksjon from '../../infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsgiverSeksjon from '../../infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../infopanel/panelelementer/LegeSeksjon';
import BehandlingsDatoer from '../../infopanel/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../../infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../../infopanel/layout/SeksjonMedTittel';
import ElementMedTekst from '../../infopanel/layout/ElementMedTekst';
<<<<<<< HEAD
import Sporsmal from '../../sporsmal/Sporsmal';
import Arbeidsgiver from '../../../types/arbeidsgiverTypes';
=======
import Utvidbar from '../../utvidbar/Utvidbar';

import doktor from '../../../svg/doktor.svg';
import doktorHover from '../../../svg/doktorHover.svg';
>>>>>>> 400cd7c62b9ec622b3f98f0c3e91427b59e5811c

interface SykmeldingProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    sykmeldingUtenforVentetid: boolean;
}

const NySykmelding: React.FC<SykmeldingProps> = ({
    sykmelding,
    arbeidsgivere,
    sykmeldingUtenforVentetid,
}: SykmeldingProps) => {
    const utfyllingRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    console.log(sykmelding);

    return (
        <div className="sykmelding-container">
            <Sidetopp tekst="Sykmelding" />
            <EldreSykmeldingVarsel />
            <Veileder
                innhold={<Normaltekst>{tekster['ny-sykmelding.introtekst']}</Normaltekst>}
                onClick={() => window.scrollTo({ top: utfyllingRef.current.offsetTop - 100, behavior: 'smooth' })}
                knappTekst="Gå til utfyllingen"
            />

            <InfoPanel tittel="Din sykmelding" fargetema="info">
                <Tittel tekst="Sykmelding" />
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <FraverSeksjon fraver={sykmelding.medisinskVurdering.annenFraversArsak} />
                <SvangerskapSeksjon svangerskap={sykmelding.medisinskVurdering.svangerskap} />
                <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
                <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
                <PrognoseSeksjon prognose={sykmelding.prognose} />
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <Utvidbar
                    ikon={doktor}
                    ikonHover={doktorHover}
                    tittel={tekster['ny-sykmelding.flere-opplysninger.tittel']}
                >
                    <BehandlingsDatoer
                        behandletTidspunkt={sykmelding.behandletTidspunkt}
                        syketilfelleStartDato={sykmelding.syketilfelleStartDato}
                    />
                    <MulighetForArbeid />
                    <Friskmelding prognose={sykmelding.prognose} />
                    <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
                    <Arbeidsevne
                        tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                        tiltakNAV={sykmelding.tiltakNAV}
                    />
                    <SeksjonMedTittel tittel="Annet">
                        <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
                    </SeksjonMedTittel>
                </Utvidbar>
            </InfoPanel>

            {/* TODO: Bestemme om denne skal være i Sporsmal-komponent eller som egen komponent */}
            <div ref={utfyllingRef} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <h1>Bruk sykmeldingen</h1>
                Ifølge folketrygdloven har den to formål: melde fra om sykefravær til NAV og arbeidsgiveren slik at du
                kan få hjelp til å komme tilbake i jobb legge til rette for at du kan søke om sykepenger Les mer om
                hvordan NAV behandler personopplysninger
            </div>
            
            <Sporsmal
                sykmelding={sykmelding}
                arbeidsgivere={arbeidsgivere}
                sykmeldingUtenforVentetid={sykmeldingUtenforVentetid}
            />
        </div>
    );
};

export default NySykmelding;
