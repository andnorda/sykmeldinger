import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { SvarRestriksjon } from '../../api-models/sykmelding/UtdypendeOpplysninger'
import {
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    Periodetype,
    RegelStatus,
    StatusEvent,
} from '../resolver-types.generated'

export const sykmeldingUgyldigTilbakedatering: Sykmelding = {
    id: 'UGYLDIG-TILBAKEDATERING',
    mottattTidspunkt: '2021-06-16T20:00:00Z',
    behandlingsutfall: { status: RegelStatus.Ok, ruleHits: [] },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: { navn: 'LOMMEN BARNEHAVE' },
    sykmeldingsperioder: [
        {
            fom: '2021-06-06',
            tom: '2021-06-17',
            gradert: null,
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            type: Periodetype.AktivitetIkkeMulig,
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    beskrivelse: 'andre årsaker til sykefravær',
                    arsak: [MedisinskArsakType.AktivitetForhindrerBedring],
                },
                arbeidsrelatertArsak: {
                    beskrivelse: 'andre årsaker til sykefravær',
                    arsak: [ArbeidsrelatertArsakType.Annet],
                },
            },
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        statusEvent: StatusEvent.Apen,
        timestamp: '2021-06-17T07:31:16.870561Z',
        arbeidsgiver: null,
        sporsmalOgSvarListe: [],
    },
    medisinskVurdering: {
        hovedDiagnose: { kode: 'L87', system: 'ICPC-2', tekst: 'TENDINITT INA' },
        biDiagnoser: [{ kode: 'L87', system: 'ICPC-2', tekst: 'GANGLION SENE' }],
        annenFraversArsak: null,
        svangerskap: false,
        yrkesskade: false,
        yrkesskadeDato: '2021-06-06',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2021-06-06',
            vurderingsdato: '2021-06-06',
        },
        erIkkeIArbeid: null,
    },
    utdypendeOpplysninger: {
        '6.2': {
            '6.2.1': {
                sporsmal: 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.',
                svar: 'Langvarig korsryggsmerter. Ømhet og smerte',
                restriksjoner: [SvarRestriksjon.SKJERMET_FOR_ARBEIDSGIVER],
            },
            '6.2.2': {
                sporsmal: 'Hvordan påvirker sykdommen arbeidsevnen',
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: 559367c0-6ce7-456f-9936-ef8b9193509f',
                restriksjoner: [SvarRestriksjon.SKJERMET_FOR_ARBEIDSGIVER],
            },
            '6.2.3': {
                sporsmal: 'Har behandlingen frem til nå bedret arbeidsevnen?',
                svar: 'Nei',
                restriksjoner: [SvarRestriksjon.SKJERMET_FOR_ARBEIDSGIVER],
            },
            '6.2.4': {
                sporsmal: 'Beskriv Pågående og planlagt henvisning, utredning og/eller behandling',
                svar: 'Henvist til fysio',
                restriksjoner: [SvarRestriksjon.SKJERMET_FOR_ARBEIDSGIVER],
            },
        },
    },
    tiltakArbeidsplassen: 'Fortsett som sist.',
    tiltakNAV:
        'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
    andreTiltak: null,
    meldingTilNAV: null,
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: 'begrunnelse' },
    behandletTidspunkt: '2021-06-17T00:00:00Z',
    behandler: {
        fornavn: 'Frida',
        mellomnavn: 'Perma',
        etternavn: 'Frost',
        adresse: {
            gate: 'Kirkegårdsveien 3',
            postnummer: 1348,
            kommune: 'Rykkinn',
            postboks: null,
            land: 'Country',
        },
        tlf: 'tel:94431152',
    },
    syketilfelleStartDato: '2021-06-17',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: [{ type: 'UGYLDIG_TILBAKEDATERING', beskrivelse: null }],
    pasient: { fnr: '06078104285', fornavn: 'KORRUPT', mellomnavn: null, etternavn: 'RISPBÆRBUSK' },
}
