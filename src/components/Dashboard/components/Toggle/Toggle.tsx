import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ETokenType } from '~/enums';

interface IToggleProps {
  selectedToken: ETokenType;
  handleTokenChange: (_event: React.MouseEvent<HTMLElement>, newToken: ETokenType.DAI) => void;
}

export const Toggle = ({ selectedToken, handleTokenChange }: IToggleProps) => (
  <StyledToggle>
    <ToggleButtonGroup value={selectedToken} exclusive onChange={handleTokenChange} aria-label='token selection'>
      <ToggleButton value={ETokenType.DAI} aria-label='DAI token' data-testid='toggle-DAI'>
        {ETokenType.DAI}
      </ToggleButton>

      <ToggleButton value={ETokenType.USDC} aria-label='USDC token' data-testid='toggle-USDC'>
        {ETokenType.USDC}
      </ToggleButton>
    </ToggleButtonGroup>
  </StyledToggle>
);

const StyledToggle = styled('div')({
  '& button': {
    width: '4rem',
  },
});
