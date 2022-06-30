import React, { useContext, useRef, useState } from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Button, Loader } from '@navikt/ds-react';
import { Close } from '@navikt/ds-icons';

import { AvbrytContext } from '../AvbrytContext';
import Spacing from '../../../../Spacing/Spacing';
import CenterItems from '../../../../CenterItems/CenterItems';
import useGetSykmeldingIdParam from '../../../../../hooks/useGetSykmeldingIdParam';
import { useChangeSykmeldingStatus } from '../../../../../hooks/useMutations';
import { SykmeldingChangeStatus } from '../../../../../fetching/graphql.generated';

import styles from './AvbrytPanel.module.css';

const AvbrytPanel: React.FC<{ disable: boolean }> = ({ disable }) => {
    const sykmeldingId = useGetSykmeldingIdParam();

    // maAvbryte overrules isOpen
    const { maAvbryte } = useContext(AvbrytContext);
    const [isOpen, setIsOpen] = useState(false);

    const avbrytPanelRef = useRef<HTMLDivElement>(null);

    const [{ loading, error }, avbryt] = useChangeSykmeldingStatus(sykmeldingId, SykmeldingChangeStatus.Avbryt);

    if (maAvbryte) {
        return (
            <div className={styles.avbrytPanel} role="alert" aria-live="polite">
                <Undertittel tag="h3" className={styles.avbrytPanelTitle}>
                    Du kan ikke bruke denne sykmeldingen
                </Undertittel>
                <Element className={styles.avbrytPanelInfo}>
                    Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for å få en ny.
                </Element>
                <Button
                    variant="danger"
                    className={styles.avbrytPanelAvbrytKnapp}
                    onClick={() => avbryt()}
                    disabled={loading}
                >
                    Avbryt sykmelding {loading && <Loader />}
                </Button>

                {error && (
                    <Spacing direction="top">
                        <AlertStripeFeil role="alert" aria-live="polite">
                            En feil oppsto som som gjorde at sykmeldingen ikke kunne avbrytes. Prøv igjen senere.
                        </AlertStripeFeil>
                    </Spacing>
                )}
            </div>
        );
    }

    return (
        <>
            <Spacing amount="small">
                <CenterItems horizontal>
                    <Button
                        variant="tertiary"
                        size="small"
                        disabled={disable}
                        onClick={() => {
                            setIsOpen((prev) => !prev);
                            setTimeout(() => {
                                avbrytPanelRef.current?.focus();
                            }, 100);
                        }}
                    >
                        Jeg vil avbryte sykmeldingen
                    </Button>
                </CenterItems>
            </Spacing>

            {isOpen && (
                <div className={styles.avbrytPanel} ref={avbrytPanelRef} role="alert" aria-live="polite">
                    <Button
                        variant="tertiary"
                        className={styles.avbrytPanelCross}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <Close />
                    </Button>

                    <Normaltekst className={styles.avbrytPanelErDuSikker}>
                        Er du sikker på at du vil avbryte sykmeldingen?
                    </Normaltekst>
                    <Button className={styles.bold} variant="danger" onClick={() => avbryt()} disabled={loading}>
                        Ja, jeg er sikker {loading && <Loader />}
                    </Button>

                    {error && (
                        <Spacing direction="top">
                            <AlertStripeFeil role="alert" aria-live="polite">
                                Det oppsto en feil ved avbryting av sykmeldingen. Vennligst prøv igjen senere.
                            </AlertStripeFeil>
                        </Spacing>
                    )}
                </div>
            )}
        </>
    );
};

export default AvbrytPanel;
