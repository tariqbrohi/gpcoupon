import AppContext from '@/modules/components/AppContext';
import React, { useContext, useState } from 'react';
import stringSimilarity from 'string-similarity';
import styled from 'styled-components';
import {
  Grid,
  countryOptions,
  countryToFlag,
  Icon,
  Paragraph,
  Modal,
  List,
  Input,
} from '@growth-ui/react';

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  cursor: pointer;
  background: ${({ theme }) => theme.color.themeBg};

  ${({ theme }) => theme.gui.media.mobile} {
    background: #fff;
    border-radius: 50px;
    padding: 5px 10px;
    flex: none;
    width: fit-content;
    margin: 0 auto;
  }
`;

const mapIsoToCountryName = (iso: string) =>
  countryOptions.find((opt) => iso == opt.iso)?.name || 'United States';

export default function LanguageSelector() {
  const { country, setCountry } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleCountryChange = (country: string) => () => {
    setCountry(country);
    handleClose();
  };

  return (
    <>
      <Container onClick={handleOpen}>
        <Grid.Col>
          <Paragraph fontSize="xs" style={{ fontWeight: 700 }}>
            {mapIsoToCountryName(country)}&nbsp;
            {countryToFlag[mapIsoToCountryName(country)]}
          </Paragraph>
        </Grid.Col>
        <Grid.Col>
          <Icon name="arrow dropdown" />
        </Grid.Col>
      </Container>
      <Modal open={open} onClose={handleClose}>
        <Modal.Content>
          <Input
            fluid
            size="sm"
            placeholder="Search your country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <List padded selection verticalAlign="middle">
            {countryOptions
              .filter((opt) => {
                if (!search) return true;

                const similarity = stringSimilarity.compareTwoStrings(
                  opt.name,
                  search,
                );

                if (similarity > 0.4) return true;

                return false;
              })
              .map((opt) => (
                <List.Item key={opt.key} onClick={handleCountryChange(opt.iso)}>
                  <List.Content>
                    <Paragraph fontSize="xs">
                      <b>
                        {opt.flag}&nbsp;{opt.name}
                      </b>
                    </Paragraph>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Modal.Content>
      </Modal>
    </>
  );
}
